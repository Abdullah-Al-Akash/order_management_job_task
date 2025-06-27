const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createOrder = async (req, res) => {
  try {
    const { customerId, items } = req.body;
    if (!customerId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'customerId and items are required' });
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        customerId: customerId,
      },
    });

    // Process order items
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product ID ${item.productId}` });
      }

      // Create order item
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });

      // Reduce product stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity },
      });
    }

    // Return order with items
    const orderWithItems = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {               // <-- Correct field name here
          include: { product: true }
        }
      }
    });

    res.status(201).json(orderWithItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true }
        },
        customer: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerOrders = async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId);

    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found for this customer' });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
