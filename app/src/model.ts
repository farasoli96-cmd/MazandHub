import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, ArrowLeftRight, Landmark, ReceiptText, Scale, ShoppingBasket, ShoppingCart, UsersRound, WalletCards, FileBarChart2, ShieldCheck, KeyRound, Settings2, PackageOpen } from 'lucide-react';

export type ModuleId = 'dashboard' | 'transactions' | 'accounting' | 'cheques' | 'scale' | 'purchases' | 'sales' | 'baskets' | 'employees' | 'expenses' | 'reports' | 'users' | 'license' | 'settings';
export type Role = 'developer' | 'manager' | 'accountant' | 'operator' | 'sales' | 'auditor';
export type Access = 'read' | 'write' | 'manage';
export type LicenseTier = 'trial' | 'professional';
export type RecordItem = { id: string; date: string; title: string; detail: string; amount: number; type: 'in' | 'out' | 'neutral'; status: 'تأییدشده' | 'در انتظار' | 'نیازمند بررسی' };
export type Module = { id: ModuleId; title: string; caption: string; group: 'main' | 'finance' | 'operations' | 'system'; icon: LucideIcon; source: string; premium?: boolean };

export const modules: Module[] = [
  { id: 'dashboard', title: 'نمای کلی', caption: 'میز کار امروز', group: 'main', icon: LayoutDashboard, source: 'نمای تلفیقی' },
  { id: 'transactions', title: 'تراکنش‌ها', caption: 'جریان ورودی و خروجی بانک', group: 'finance', icon: ArrowLeftRight, source: 'Transactions.xlsx' },
  { id: 'accounting', title: 'حسابداری', caption: 'دفتر کل و تراز', group: 'finance', icon: Landmark, source: 'Accounting.xlsx' },
  { id: 'cheques', title: 'چک‌ها', caption: 'ثبت و پیگیری چک', group: 'finance', icon: WalletCards, source: 'Cheques.xlsx' },
  { id: 'expenses', title: 'هزینه‌ها', caption: 'کنترل هزینه‌های دوره', group: 'finance', icon: ReceiptText, source: 'Expenses.xlsx' },
  { id: 'scale', title: 'باسکول', caption: 'ثبت ورود و خروج بار', group: 'operations', icon: Scale, source: 'Baskol.xlsx' },
  { id: 'purchases', title: 'خرید', caption: 'تأمین و تسویه', group: 'operations', icon: ShoppingBasket, source: 'Purchases.xlsx' },
  { id: 'sales', title: 'فروش', caption: 'مشتریان و فاکتورها', group: 'operations', icon: ShoppingCart, source: 'Sales.xlsx' },
  { id: 'baskets', title: 'سبدها', caption: 'گردش سبد و ظروف', group: 'operations', icon: PackageOpen, source: 'Baskets.xlsx' },
  { id: 'employees', title: 'کارکنان', caption: 'دستمزد و سهم گروهی', group: 'operations', icon: UsersRound, source: 'Employees.xlsx' },
  { id: 'reports', title: 'گزارش‌های پیشرفته', caption: 'تحلیل مدیریتی', group: 'finance', icon: FileBarChart2, source: 'گزارش تلفیقی', premium: true },
  { id: 'users', title: 'کاربران و دسترسی', caption: 'نقش‌ها و مجوزها', group: 'system', icon: ShieldCheck, source: 'هستهٔ برنامه' },
  { id: 'license', title: 'اشتراک و فعال‌سازی', caption: 'وضعیت نسخه', group: 'system', icon: KeyRound, source: 'هستهٔ برنامه' },
  { id: 'settings', title: 'تنظیمات', caption: 'شرکت و شخصی‌سازی', group: 'system', icon: Settings2, source: 'INFO.xlsx' },
];

export const roleLabels: Record<Role, string> = {
  developer: 'طراح سامانه', manager: 'مدیر مجموعه', accountant: 'حسابدار', operator: 'مسئول باسکول', sales: 'کارشناس فروش', auditor: 'ناظر / فقط مشاهده',
};
export const roleDescriptions: Record<Role, string> = {
  developer: 'دسترسی کامل به همه بخش‌ها و تنظیمات',
  manager: 'نمای مدیریتی و تأیید عملیات',
  accountant: 'ثبت مالی، چک‌ها و گزارش‌ها',
  operator: 'ثبت باسکول و عملیات خرید',
  sales: 'فروش و مشتریان',
  auditor: 'مشاهده اطلاعات بدون امکان تغییر',
};
export const accounts: { username: string; name: string; role: Role; initials: string }[] = [
  { username: 'developer', name: 'مدیر سامانه', role: 'developer', initials: 'م‌س' },
  { username: 'manager', name: 'مدیر مجموعه', role: 'manager', initials: 'م‌م' },
  { username: 'accountant', name: 'کارشناس مالی', role: 'accountant', initials: 'ک‌م' },
  { username: 'operator', name: 'مسئول باسکول', role: 'operator', initials: 'م‌ب' },
  { username: 'sales', name: 'کارشناس فروش', role: 'sales', initials: 'ک‌ف' },
  { username: 'auditor', name: 'ناظر مجموعه', role: 'auditor', initials: 'ن‌م' },
];

// Prototype-only presentation policy. A production API MUST enforce the same permissions server-side.
const read = (ids: ModuleId[]) => Object.fromEntries(ids.map(id => [id, 'read' as Access])) as Partial<Record<ModuleId, Access>>;
export const permissions: Record<Role, Partial<Record<ModuleId, Access>>> = {
  developer: Object.fromEntries(modules.map(m => [m.id, 'manage' as Access])) as Record<ModuleId, Access>,
  manager: { ...read(['dashboard','transactions','accounting','cheques','expenses','scale','purchases','sales','baskets','employees','reports','license','settings']), transactions:'manage', accounting:'manage', cheques:'manage', expenses:'manage', purchases:'manage', sales:'manage', users:'manage' },
  accountant: { ...read(['dashboard','scale','purchases','sales','baskets','employees','reports','license']), transactions:'write', accounting:'write', cheques:'write', expenses:'write' },
  operator: { ...read(['dashboard','purchases','baskets','license']), scale:'write', purchases:'write', baskets:'write' },
  sales: { ...read(['dashboard','baskets','license']), sales:'write', transactions:'read' },
  auditor: { ...read(['dashboard','transactions','accounting','cheques','expenses','scale','purchases','sales','baskets','employees','reports','license']) },
};
export function can(role: Role, id: ModuleId, action: Access = 'read') {
  const level = permissions[role][id];
  return !!level && ['read', 'write', 'manage'].indexOf(level) >= ['read', 'write', 'manage'].indexOf(action);
}
export const fa = (value: number) => new Intl.NumberFormat('fa-IR').format(value);

// Deliberately fictional data for UX review; none of these numbers are calculated from the workbooks.
export const demoRows: Record<string, RecordItem[]> = {
  transactions: [
    { id:'TR-2847', date:'۱۴۰۵/۰۷/۱۷', title:'دریافت از مشتری', detail:'بانک ملت · مشتری عمده', amount:124500000, type:'in', status:'تأییدشده' },
    { id:'TR-2846', date:'۱۴۰۵/۰۷/۱۷', title:'پرداخت به تأمین‌کننده', detail:'بانک صادرات · باغ‌دار', amount:38500000, type:'out', status:'در انتظار' },
    { id:'TR-2845', date:'۱۴۰۵/۰۷/۱۶', title:'هزینه حمل بار', detail:'بانک ملت · حمل و نقل', amount:12750000, type:'out', status:'تأییدشده' },
    { id:'TR-2844', date:'۱۴۰۵/۰۷/۱۶', title:'دریافت از فروشنده', detail:'بانک ملت · فروش مرکبات', amount:81000000, type:'in', status:'نیازمند بررسی' },
  ],
  scale: [
    { id:'BS-0194', date:'۱۴۰۵/۰۷/۱۷', title:'ورود پرتقال تامسون', detail:'باغ رستمی · ۱۲٬۴۵۰ کیلوگرم', amount:0, type:'neutral', status:'تأییدشده' },
    { id:'BS-0193', date:'۱۴۰۵/۰۷/۱۷', title:'خروج نارنگی', detail:'مشتری عمده · ۸٬۲۰۰ کیلوگرم', amount:0, type:'neutral', status:'در انتظار' },
    { id:'BS-0192', date:'۱۴۰۵/۰۷/۱۶', title:'ورود پرتقال شمال', detail:'تأمین‌کننده · ۶٬۸۰۰ کیلوگرم', amount:0, type:'neutral', status:'تأییدشده' },
  ],
  sales: [
    { id:'SL-1048', date:'۱۴۰۵/۰۷/۱۷', title:'فروش پرتقال درجه یک', detail:'بازرگانی بهار · ۸٬۲۰۰ کیلوگرم', amount:124500000, type:'in', status:'تأییدشده' },
    { id:'SL-1047', date:'۱۴۰۵/۰۷/۱۶', title:'فروش نارنگی سورت‌شده', detail:'مشتری صادراتی · ۵٬۵۰۰ کیلوگرم', amount:87000000, type:'in', status:'در انتظار' },
  ],
  cheques: [
    { id:'CH-0301', date:'۱۴۰۵/۰۷/۲۰', title:'چک تأمین‌کننده', detail:'بانک ملت · سررسید ۲۰ مهر', amount:80000000, type:'out', status:'در انتظار' },
    { id:'CH-0300', date:'۱۴۰۵/۰۷/۲۶', title:'چک خدمات حمل', detail:'بانک صادرات · سررسید ۲۶ مهر', amount:45000000, type:'out', status:'نیازمند بررسی' },
  ],
};
export const genericRows: RecordItem[] = [
  { id:'DOC-0087', date:'۱۴۰۵/۰۷/۱۷', title:'ثبت نمونهٔ جدید', detail:'اطلاعات نمایشی · بدون اتصال به اکسل', amount:24000000, type:'in', status:'تأییدشده' },
  { id:'DOC-0086', date:'۱۴۰۵/۰۷/۱۶', title:'سند در انتظار رسیدگی', detail:'اطلاعات نمایشی · بدون اتصال به اکسل', amount:12600000, type:'out', status:'در انتظار' },
  { id:'DOC-0085', date:'۱۴۰۵/۰۷/۱۵', title:'نیازمند تطبیق', detail:'اطلاعات نمایشی · بدون اتصال به اکسل', amount:5300000, type:'out', status:'نیازمند بررسی' },
];
