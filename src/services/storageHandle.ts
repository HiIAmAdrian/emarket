import { ShopItem, Order } from '../common/variables/types';

export function getUserToken(): string {
  return JSON.parse(localStorage.getItem('userToken') as string);
}

export function setUserToken(token: string): void {
  localStorage.setItem('userToken', JSON.stringify(token));
}

export function removeUserToken(): void {
  localStorage.removeItem('userToken');
}

export function getUserName(): string {
  return JSON.parse(localStorage.getItem('userName') as string);
}

export function setUserName(name: string): void {
  localStorage.setItem('userName', JSON.stringify(name));
}

export function removeUserName(): void {
  localStorage.removeItem('userName');
}

export function getNbOfItems(): number {
  return JSON.parse(localStorage.getItem('numberOfItems') as string);
}

export function setNbOfItems(nb: string): void {
  localStorage.setItem('numberOfItems', JSON.stringify(nb));
}

export function setOrder(order: Order): void {
  const lastOrderId = new Date().toISOString();
  localStorage.setItem(`orderId: ${lastOrderId}`, JSON.stringify(order));
}

export function getOrder(id: number): ShopItem[] {
  return JSON.parse(localStorage.getItem(`orderId: ${id}`) as string);
}

export function getOrders() {
  const ordersKeys = Object.keys(localStorage).filter(
    (item) => !item.slice(0, 8).localeCompare('orderId:')
  );

  let orders = ordersKeys.map((key) =>
    JSON.parse(localStorage.getItem(key) as string)
  );

  interface Options {
    year: 'numeric';
    month: 'short';
    day: 'numeric';
  }
  const op: Options = { year: 'numeric', month: 'short', day: 'numeric' };
  orders = orders.map((order, index) => {
    return {
      ...order,
      timestamp: new Date(
        ordersKeys[index].split(' ').pop() as string
      ).toLocaleDateString('en-GB', op),
    };
  });
  orders = orders.sort((a, b) => {
    return a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;
  });

  return orders;
}
