class Book {
  constructor(private basePrice: number) {}

  finalPrice(): number {
    return this.basePrice * 2;
  }
}

class TaxableBook extends Book {
  constructor(basePrice: number, private taxRate: number) {
    super(basePrice);
  }
  finalPrice(): number {
    return this.taxRate * super.finalPrice();
  }
}

console.log(new TaxableBook(10, 2).finalPrice()); //should print 40
