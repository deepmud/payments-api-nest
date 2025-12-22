export class AdyenAdapter {
    normalize(e) {
      return {
        provider: 'adyen',
        id: e.pspReference,
        reference: e.merchantReference,
        amount: e.amount.value,
        currency: e.amount.currency,
      };
    }
  }
  