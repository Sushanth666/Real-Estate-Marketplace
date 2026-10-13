/**
 * Format amounts into Indian Rupee format (₹ Lakhs and ₹ Crores)
 * e.g., 8500000 -> ₹85 Lakh | 28500000 -> ₹2.85 Cr
 */
export function formatIndianCurrency(amount) {
  if (!amount && amount !== 0) return '₹ Price on Request';
  
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2).replace(/\.00$/, '');
    return `₹${cr} Cr`;
  }
  
  if (amount >= 100000) {
    const lk = (amount / 100000).toFixed(2).replace(/\.00$/, '');
    return `₹${lk} L`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format raw numbers into Indian comma format: 12,50,000
 */
export function formatIndianNumber(num) {
  if (!num && num !== 0) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Calculate estimated monthly EMI in INR
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(principal, annualRate = 8.5, tenureYears = 20) {
  if (!principal || principal <= 0) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}
