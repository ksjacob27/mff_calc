const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON parsing for POST bodies
app.use(express.json());

/**
 * Replicates your C++ bamGold() logic in JavaScript
 */
function bamGold(rank, amount) {
  let total = Math.floor(amount / 50) * 125000;
  let amount2 = Math.floor(amount / 50);
  let cost = 187500;

  for (let i = 3; i <= rank; i++) {
    total += Math.floor(amount2 / 2) * cost;
    amount2 = Math.floor(amount2 / 2);
    cost += 62500;
  }

  return total;
}

/**
 * Replicates your C++ ccfGold() logic in JavaScript
 */
function ccfGold(rank, amount) {
  let total = Math.floor(amount / 35) * 250000;
  let amount2 = Math.floor(amount / 35);
  let cost = 375000;

  for (let i = 3; i <= rank; i++) {
    total += Math.floor(amount2 / 2) * cost;
    amount2 = Math.floor(amount2 / 2);
    cost += 125000;
  }

  return total;
}

/**
 * POST /calculate
 * Expects JSON body: { resourceType: "BAM" | "CCF", rank: number, baseAmount: number }
 * Returns JSON: { totalUnits: number, totalCost: number }
 */
app.post('/calculate', (req, res) => {
  const { resourceType, rank, baseAmount } = req.body;

  // Basic validation
  if (
    typeof resourceType !== 'string' ||
    !['BAM', 'CCF'].includes(resourceType) ||
    typeof rank !== 'number' ||
    typeof baseAmount !== 'number' ||
    rank < 1 ||
    baseAmount < 1
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Compute amount2 = baseAmount * 2^(rank-2)
  const amount2 = baseAmount * Math.pow(2, rank - 2);

  // Compute totalUnits
  let totalUnits;
  if (resourceType === 'BAM') {
    totalUnits = amount2 * 50;
  } else {
    totalUnits = amount2 * 35;
  }

  // Compute totalCost using the appropriate function
  let totalCost;
  if (resourceType === 'BAM') {
    totalCost = bamGold(rank, totalUnits);
  } else {
    totalCost = ccfGold(rank, totalUnits);
  }

  return res.json({ totalUnits, totalCost });
});

/**
 * GET /
 * Serves index.html (must live alongside index.js)
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});