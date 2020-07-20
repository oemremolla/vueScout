export default function groupByBasketItem(array) {
  const manipulatedData = array.map(item => ({
    ...item,
    quantity: 1,
  }));

  return manipulatedData.reduce((m, o) => {
    const found = m.find(p => p.id === o.id);
    if (found) {
      found.quantity += 1;
    } else {
      m.push(o);
    }

    return m;
  }, []);
}
