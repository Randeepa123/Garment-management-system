function formatGeminiPrompt(stockData, usageData, startDate, endDate) {
  // Transform data into readable format
  const stockEntries = stockData.map(s =>
    `- ${s.itemName} (${s.category}): Added ${s.quantity} units at LKR ${s.price} each`
  ).join('\n');

  const usageEntries = usageData.map(u =>
    `- ${u.itemName} (${u.category}): Used ${u.quantityUsed} units`
  ).join('\n');

  return `
You are a stock forecasting AI for a garment manufacturing company.
Predict the required materials and costs for the period: ${startDate} to ${endDate}.

Historical data from the same period last year:

STOCK ADDITIONS:
${stockEntries.length ? stockEntries : 'No stock additions recorded'}

MATERIAL USAGE:
${usageEntries.length ? usageEntries : 'No usage data recorded'}

Return your prediction in this EXACT JSON format:
{
  "details": [
    {
      "category": "category_name",
      "itemName": "item_name",
      "requiredQuantity": number,
      "Price": number,
      "estimatedCost": number
    }
  ]
}

Important guidelines:
1. Consider seasonal demand patterns
2. Account for current inventory levels
3. Include a 15% buffer for unexpected demand
4. estimatedCost  totalprice
5. Use LKR (Sri Lankan Rupees) for all monetary values
`;
}

module.exports = formatGeminiPrompt; // DEFAULT EXPORT