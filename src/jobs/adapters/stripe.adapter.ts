export class StripeAdapter {
    normalize(e) {
      return {
        provider: 'stripe',
        id: e.id,
        reference: e.data.object.metadata.ref,
        amount: e.data.object.amount,
        currency: e.data.object.currency,
      };
    }
  }
  