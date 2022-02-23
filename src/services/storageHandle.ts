import { ShopItem, Order } from '../types';

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
  console.log(lastOrderId);
  localStorage.setItem(`orderId: ${lastOrderId}`, JSON.stringify(order));
}

export function getOrder(id: number): ShopItem[] {
  return JSON.parse(localStorage.getItem(`orderId: ${id}`) as string);
}
