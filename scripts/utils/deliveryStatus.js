export function getCurrentDeliveryStatus(deliveryProgress) {
  if (deliveryProgress >= 0 && deliveryProgress < 50) {
    return "preparing";
  } else if (deliveryProgress >= 50 && deliveryProgress < 100) {
    return "shipping";
  } else {
    return "delivered";
  }
}
