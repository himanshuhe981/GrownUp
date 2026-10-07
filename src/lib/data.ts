import { User, Goal, Holding, Transaction, ChartPoint, Notification, InvestmentOption, AIMessage, MoneyFitness, CircleTrend, CircleActivity } from './types';

export const mockUser: User = {
  name: 'Aarav',
  age: 24,
  location: 'Hyderabad',
  avatar: 'A',
};

export const mockMoneyFitness: MoneyFitness = {
  streakMonths: 5,
  monthlyConsistent: true,
  conceptsLearned: 12,
  milestone: '6 months consistent',
};

export const mockCircleTrends: CircleTrend[] = [
  {
    id: 't-1',
    topic: 'Index funds',
    count: 8,
    type: 'exploring',
    description: 'people in your circle',
  },
  {
    id: 't-2',
    topic: 'Monthly SIPs',
    count: 5,
    type: 'started SIP',
    description: 'people started one',
  },
  {
    id: 't-3',
    topic: 'Large-cap funds',
    count: 3,
    type: 'exploring',
    description: 'people are exploring',
  },
];

export const mockCircleActivity: CircleActivity[] = [
  {
    id: 'ca-1',
    user: 'Priya',
    action: 'completed her milestone',
    context: 'Emergency Fund',
    time: '2h ago',
  },
  {
    id: 'ca-2',
    user: 'Rahul',
    action: 'completed 5 consecutive months',
    context: 'of investing',
    time: 'Yesterday',
  },
];

export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    name: 'Emergency Fund',
    icon: 'shield',
    target: 50000,
    current: 18000,
    monthlyContribution: 2000,
    targetDate: '2027-06',
    color: '#00D09C',
  },
  {
    id: 'goal-2',
    name: 'Travel Fund',
    icon: 'plane',
    target: 80000,
    current: 24000,
    monthlyContribution: 3000,
    targetDate: '2028-03',
    color: '#5B8DEF',
  },
  {
    id: 'goal-3',
    name: 'Long-term Wealth',
    icon: 'trending-up',
    target: 500000,
    current: 42000,
    monthlyContribution: 5000,
    targetDate: '2031-12',
    color: '#F5A623',
  },
];

export const mockHoldings: Holding[] = [
  {
    id: 'h-1',
    name: 'Nifty 50 Index Fund',
    type: 'Mutual Fund',
    invested: 10000,
    current: 11200,
    units: 42.5,
  },
  {
    id: 'h-2',
    name: 'HDFC Flexi Cap Fund',
    type: 'Mutual Fund',
    invested: 6000,
    current: 6850,
    units: 15.2,
  },
  {
    id: 'h-3',
    name: 'Infosys',
    type: 'Stock',
    invested: 5000,
    current: 5400,
    units: 3,
  },
  {
    id: 'h-4',
    name: 'Reliance Industries',
    type: 'Stock',
    invested: 3000,
    current: 2800,
    units: 1,
  },
  {
    id: 'h-5',
    name: 'Nifty BeES',
    type: 'ETF',
    invested: 2500,
    current: 2700,
    units: 10,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 't-1',
    title: 'SIP - Nifty 50 Index Fund',
    description: 'Monthly SIP',
    amount: 1000,
    date: '2026-10-05',
    type: 'sip',
  },
  {
    id: 't-2',
    title: 'Investment - HDFC Flexi Cap',
    description: 'One-time investment',
    amount: 2000,
    date: '2026-10-03',
    type: 'investment',
  },
  {
    id: 't-3',
    title: 'Goal - Emergency Fund',
    description: 'Monthly contribution',
    amount: 500,
    date: '2026-10-01',
    type: 'goal',
  },
  {
    id: 't-4',
    title: 'SIP - Nifty 50 Index Fund',
    description: 'Monthly SIP',
    amount: 1000,
    date: '2026-09-05',
    type: 'sip',
  },
  {
    id: 't-5',
    title: 'Dividend - Infosys',
    description: 'Quarterly dividend',
    amount: 150,
    date: '2026-09-01',
    type: 'dividend',
  },
];

export const mockChartData: Record<string, ChartPoint[]> = {
  '1D': [
    { label: '9:15', value: 28200 },
    { label: '10:00', value: 28350 },
    { label: '11:00', value: 28280 },
    { label: '12:00', value: 28400 },
    { label: '13:00', value: 28380 },
    { label: '14:00', value: 28420 },
    { label: '15:30', value: 28450 },
  ],
  '1W': [
    { label: 'Mon', value: 28000 },
    { label: 'Tue', value: 28150 },
    { label: 'Wed', value: 28050 },
    { label: 'Thu', value: 28300 },
    { label: 'Fri', value: 28450 },
  ],
  '1M': [
    { label: 'W1', value: 27200 },
    { label: 'W2', value: 27500 },
    { label: 'W3', value: 27800 },
    { label: 'W4', value: 28450 },
  ],
  '1Y': [
    { label: 'Jan', value: 20000 },
    { label: 'Feb', value: 21200 },
    { label: 'Mar', value: 20800 },
    { label: 'Apr', value: 22500 },
    { label: 'May', value: 23000 },
    { label: 'Jun', value: 23800 },
    { label: 'Jul', value: 25000 },
    { label: 'Aug', value: 24500 },
    { label: 'Sep', value: 26800 },
    { label: 'Oct', value: 28450 },
  ],
  'ALL': [
    { label: 'Oct 25', value: 5000 },
    { label: 'Jan 26', value: 8500 },
    { label: 'Apr 26', value: 15000 },
    { label: 'Jul 26', value: 22000 },
    { label: 'Oct 26', value: 28450 },
  ],
};

export const mockNotifications: Notification[] = [
  {
    id: 'n-1',
    title: 'SIP Executed',
    message: 'Your monthly SIP of ₹1,000 in Nifty 50 Index Fund was executed successfully.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n-2',
    title: 'Goal Milestone',
    message: 'Your Emergency Fund has crossed 35% — you\'re making great progress.',
    time: '1 day ago',
    read: false,
  },
  {
    id: 'n-3',
    title: 'Market Update',
    message: 'Nifty 50 closed at 26,250 today, up 0.4% from yesterday.',
    time: '2 days ago',
    read: true,
  },
  {
    id: 'n-4',
    title: 'Learning',
    message: 'New article: "3 things to know before starting a SIP"',
    time: '3 days ago',
    read: true,
  },
];

export const mockInvestmentOptions: InvestmentOption[] = [
  {
    id: 'inv-1',
    name: 'Nifty 50 Index Fund',
    type: 'Mutual Fund',
    category: 'Index Fund',
    risk: 'Moderate',
    returns1Y: '+14.2%',
    returns3Y: '+12.8%',
    minInvestment: 500,
    description: 'Tracks the top 50 companies listed on the National Stock Exchange. A popular starting point for new investors.',
  },
  {
    id: 'inv-2',
    name: 'HDFC Flexi Cap Fund',
    type: 'Mutual Fund',
    category: 'Flexi Cap',
    risk: 'Moderate',
    returns1Y: '+18.5%',
    returns3Y: '+15.2%',
    minInvestment: 500,
    description: 'Invests across large, mid, and small companies. The fund manager picks stocks based on market conditions.',
  },
  {
    id: 'inv-3',
    name: 'Parag Parikh Flexi Cap',
    type: 'Mutual Fund',
    category: 'Flexi Cap',
    risk: 'Moderate',
    returns1Y: '+16.3%',
    returns3Y: '+14.7%',
    minInvestment: 1000,
    description: 'Invests in Indian and international stocks. Known for its consistent long-term performance.',
  },
  {
    id: 'inv-4',
    name: 'Infosys',
    type: 'Stock',
    category: 'IT',
    risk: 'Moderate',
    returns1Y: '+8.5%',
    minInvestment: 1800,
    description: 'One of India\'s largest IT services companies. A well-established blue-chip stock.',
  },
  {
    id: 'inv-5',
    name: 'HDFC Bank',
    type: 'Stock',
    category: 'Banking',
    risk: 'Moderate',
    returns1Y: '+12.1%',
    minInvestment: 1700,
    description: 'India\'s largest private sector bank. Known for consistent growth and strong fundamentals.',
  },
  {
    id: 'inv-6',
    name: 'Nifty BeES',
    type: 'ETF',
    category: 'Index ETF',
    risk: 'Moderate',
    returns1Y: '+13.8%',
    returns3Y: '+12.5%',
    minInvestment: 250,
    description: 'An ETF that tracks the Nifty 50 index. Traded on the stock exchange like a regular stock.',
  },
];

export const aiResponses: Record<string, AIMessage> = {
  'What is a SIP?': {
    id: 'ai-sip',
    role: 'assistant',
    content: 'A SIP (Systematic Investment Plan) is a way to invest a fixed amount at regular intervals — usually monthly. Instead of investing a large amount at once, you spread your contributions over time.\n\nThis helps you:\n\n• Start small — even ₹500/month works\n• Build a habit of investing regularly\n• Reduce the impact of market ups and downs (this is called rupee cost averaging)\n\nThink of it like a recurring subscription, but for your future.',
    suggestions: ['Show me an example', 'Why do people use SIPs?', 'How do I start one?'],
  },
  'Why is my portfolio down?': {
    id: 'ai-portfolio-down',
    role: 'assistant',
    content: 'Markets naturally move up and down — that\'s completely normal. Your portfolio value changes because the prices of your investments change daily.\n\nHere are a few things to keep in mind:\n\n• Short-term dips are common and expected\n• What matters more is long-term growth over years\n• If you\'re investing through a SIP, dips can actually help — you buy more units when prices are low\n\nHistorically, markets have recovered from dips over time. Staying invested is usually more beneficial than trying to time the market.',
    suggestions: ['Should I stop my SIP?', 'What is long-term investing?', 'How do I manage risk?'],
  },
  'What does risk mean?': {
    id: 'ai-risk',
    role: 'assistant',
    content: 'In investing, risk means the possibility that your investment\'s value might go down temporarily.\n\nDifferent investments carry different levels of risk:\n\n• Low risk — Safer, but usually grows slower (e.g., debt funds)\n• Moderate risk — Balanced approach, suitable for most goals (e.g., large-cap funds)\n• High risk — More ups and downs, but potential for higher growth over time (e.g., small-cap stocks)\n\nYour comfort with risk depends on your goals and timeline. Longer timelines generally allow for more risk because you have time to ride out dips.',
    suggestions: ['What risk level am I?', 'What are mutual funds?', 'Explain diversification'],
  },
  'What is diversification?': {
    id: 'ai-diversification',
    role: 'assistant',
    content: 'Diversification means spreading your money across different types of investments instead of putting everything in one place.\n\nImagine carrying all your eggs in one basket — if you drop it, you lose everything. But if you spread them across several baskets, one dropping doesn\'t ruin everything.\n\nIn investing, this means mixing:\n\n• Different asset types (stocks, mutual funds, ETFs)\n• Different sectors (IT, banking, healthcare)\n• Different risk levels\n\nThis way, if one investment doesn\'t perform well, others might balance it out.',
    suggestions: ['How is my portfolio diversified?', 'What are ETFs?', 'Show me my allocation'],
  },
  'What does expense ratio mean?': {
    id: 'ai-expense',
    role: 'assistant',
    content: 'Expense ratio is a small fee that mutual funds charge for managing your money. It\'s expressed as a percentage of your investment.\n\nFor example, if a fund has an expense ratio of 0.5%, and you invest ₹10,000, you\'d pay ₹50 per year as fees.\n\nThings to know:\n\n• Index funds typically have lower expense ratios (0.1–0.5%)\n• Actively managed funds may charge more (1–2%)\n• Lower isn\'t always better — what matters is the net return after fees\n\nAlways check the expense ratio before investing, especially for long-term investments where fees compound.',
    suggestions: ['What are index funds?', 'Active vs passive investing', 'Got it'],
  },
  'default': {
    id: 'ai-default',
    role: 'assistant',
    content: 'That\'s a great question! I can help you understand investing concepts, explain how different investment options work, and guide you through the basics.\n\nHere are some things I can help with:\n\n• Explaining investment terms (SIP, mutual funds, ETFs)\n• Understanding risk and returns\n• How to think about your investment goals\n• General investing concepts\n\nWhat would you like to know more about?',
    suggestions: ['What is a SIP?', 'What does risk mean?', 'What is diversification?'],
  },
};

export const goalOptions = [
  { id: 'emergency', label: 'Emergency Fund', icon: 'shield', description: 'Build a safety net' },
  { id: 'travel', label: 'Travel', icon: 'plane', description: 'Fund your next adventure' },
  { id: 'car', label: 'First Car', icon: 'car', description: 'Save for your ride' },
  { id: 'studies', label: 'Higher Studies', icon: 'graduation-cap', description: 'Invest in yourself' },
  { id: 'wealth', label: 'Long-term Wealth', icon: 'trending-up', description: 'Grow your money over time' },
  { id: 'exploring', label: 'Just Exploring', icon: 'compass', description: 'See what investing is about' },
];

export const timeHorizonOptions = [
  { id: '<1', label: 'Less than 1 year', description: 'Short-term' },
  { id: '1-3', label: '1–3 years', description: 'Medium-term' },
  { id: '3-5', label: '3–5 years', description: 'Mid to long-term' },
  { id: '5+', label: '5+ years', description: 'Long-term' },
];

export const riskOptions = [
  { id: 'sell', label: "I'd probably sell", profile: 'Conservative' as const, description: 'You prefer stability over potential growth' },
  { id: 'wait', label: "I'd wait and see", profile: 'Balanced' as const, description: 'You can handle some uncertainty' },
  { id: 'stay', label: "I'd stay invested", profile: 'Growth' as const, description: 'You\'re comfortable with market fluctuations' },
];

export const exploreCategories = [
  { id: 'mutual-funds', label: 'Mutual Funds', icon: 'pie-chart', description: 'Professionally managed, diversified' },
  { id: 'stocks', label: 'Stocks', icon: 'bar-chart-2', description: 'Own a piece of a company' },
  { id: 'etfs', label: 'ETFs', icon: 'layers', description: 'Trade like stocks, diversified like funds' },
  { id: 'index', label: 'Index Investing', icon: 'trending-up', description: 'Track the market, low cost' },
  { id: 'gold', label: 'Gold', icon: 'circle-dot', description: 'Traditional safe haven' },
  { id: 'learning', label: 'Learning', icon: 'book-open', description: 'Start from the basics' },
];

export const learnArticles = [
  {
    id: 'learn-1',
    title: 'Investing basics',
    subtitle: '3 things to understand before your first SIP',
    readTime: '2 min read',
    category: 'Getting Started',
  },
  {
    id: 'learn-2',
    title: 'What is an index fund?',
    subtitle: 'Explained without the jargon.',
    readTime: '3 min read',
    category: 'Mutual Funds',
  },
  {
    id: 'learn-3',
    title: 'Risk vs. returns',
    subtitle: 'Why higher risk doesn\'t always mean higher returns.',
    readTime: '2 min read',
    category: 'Concepts',
  },
  {
    id: 'learn-4',
    title: 'SIP vs. lump sum',
    subtitle: 'Which approach works better for beginners?',
    readTime: '3 min read',
    category: 'Strategy',
  },
  {
    id: 'learn-5',
    title: 'Understanding mutual fund categories',
    subtitle: 'Large-cap, mid-cap, flexi-cap — what do they mean?',
    readTime: '4 min read',
    category: 'Mutual Funds',
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace('₹', '₹');
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }
  return `₹${amount}`;
}
