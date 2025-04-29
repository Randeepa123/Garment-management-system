function formatGeminiReportPrompt(stockData, usageData, startDate, endDate) {
  const stockTable = `
**Total Additions by Item and Category:**
| Item | Category | Total Additions |
|---|---|---|
${stockData.reduce((acc, item) => {
      const existing = acc.find(row => row.item === item.itemName && row.category === item.category);
      if (existing) {
          existing.additions += item.quantity;
      } else {
          acc.push({ item: item.itemName, category: item.category, additions: item.quantity });
      }
      return acc;
  }, []).map(row => `| ${row.item} | ${row.category} | ${row.additions} |`).join('\n')}
`;

  const retrievalTable = `
\n**Total Retrievals by Item and Category:**
| Item | Category | Total Retrievals |
|---|---|---|
${usageData.reduce((acc, item) => {
      const existing = acc.find(row => row.item === item.itemName && row.category === item.category);
      if (existing) {
          existing.retrievals += item.quantityUsed;
      } else {
          acc.push({ item: item.itemName, category: item.category, retrievals: item.quantityUsed });
      }
      return acc;
  }, []).map(row => `| ${row.item} | ${row.category} | ${row.retrievals} |`).join('\n')}
`;

  return `
Generate a comprehensive stock report for the period: ${startDate} to ${endDate}.

${stockTable}

${retrievalTable}

**Stock Movement Summary:** Analyze the additions and retrievals to identify fast-moving and slow-moving items. Provide a brief summary of these observations.

**Negative Stock or Stock-Out Items:** Based on the provided additions and retrievals within this period, highlight any items that might have experienced negative stock levels or stock-outs (infer this if retrievals significantly exceed additions for any item).

**Insights and Trends:** Generate any other relevant insights or trends you can identify from the data, such as potential high-demand periods for specific items or categories. If possible, briefly describe these trends in a way that could be visualized (e.g., "Demand for [item] was highest in [month/period]").
`;
}

module.exports = { formatGeminiReportPrompt };
