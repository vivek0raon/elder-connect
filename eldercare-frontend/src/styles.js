export const authStyles = {
  page:
    "flex min-h-screen w-screen items-center justify-center bg-[url('/background.png')] bg-cover bg-center bg-no-repeat px-4 py-8",
  panel:
    "flex w-full max-w-[900px] overflow-hidden rounded-[28px] bg-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.2)] backdrop-blur-[14px] max-md:flex-col",
  left:
    "flex flex-1 flex-col justify-center bg-white/5 p-[52px] text-left text-[#4a5d4a] max-md:hidden",
  logo: "mb-4 block h-[250px] w-auto object-contain",
  right: "flex flex-1 flex-col justify-center p-[52px] max-md:p-10",
  title: "mb-2 text-[28px] font-semibold text-[#4a5d4a]",
  subtitle: "mb-7 text-sm text-[#6b7a6b]",
  input:
    "mb-3.5 w-full rounded-[10px] border border-[#d2d8d2] bg-[#f6f8f6] px-4 py-3.5 text-sm text-[#3f4f3f] outline-none placeholder:text-[#8b978b] focus:border-[#8fae8e] focus:bg-white",
  button:
    "w-full cursor-pointer rounded-[10px] border-0 bg-[#8fae8e] p-3.5 text-[15px] font-medium text-white transition hover:bg-[#7fa07f] disabled:cursor-not-allowed disabled:opacity-70",
  link: "mt-[18px] text-center text-sm text-[#6b7a6b]",
  linkAccent: "font-medium text-[#8fae8e]",
};

export const dashboardStyles = {
  layout: "flex min-h-screen bg-[#f2f3f2] max-lg:flex-col",
  sidebar: "w-60 shrink-0 bg-[#e7ede6] px-5 py-7 max-lg:w-full",
  brand: "mb-7 text-2xl font-bold text-[#2f3e2f]",
  navList: "m-0 list-none p-0",
  navItem:
    "my-3.5 cursor-pointer rounded-lg px-2.5 py-2.5 text-[#2f3e2f] transition hover:bg-white/60",
  activeNavItem:
    "my-3.5 cursor-pointer rounded-lg bg-[#8fae8e] px-2.5 py-2.5 text-white transition",
  main: "flex-1 px-10 py-7 max-md:px-5",
  pageTitle: "mb-5 text-3xl font-bold text-[#2f3e2f]",
  content: "mt-5",
  statsRow: "mb-7 grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1",
  statCard: "rounded-[18px] bg-white p-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)]",
  statLabel: "text-[#556b55]",
  statValue: "mt-2.5 text-3xl font-bold text-[#2f3e2f]",
  grid: "grid grid-cols-[2fr_1fr] gap-5 max-lg:grid-cols-1",
  left: "flex flex-col gap-6",
  right: "flex flex-col gap-6",
  card: "rounded-[15px] bg-[#f4f6f4] p-5 shadow-[0_10px_20px_rgba(0,0,0,0.05)]",
  cardTitle: "mb-2.5 text-base font-semibold text-[#2f3e2f]",
  input:
    "mt-3 w-full rounded-lg border border-[#ddd] bg-[#f9faf9] p-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-[#e9ece9]",
  label: "mt-3 block text-sm text-[#2f3e2f]",
  saveButton:
    "mr-2.5 mt-4 cursor-pointer rounded-md border-0 bg-[#5c8d6a] px-4 py-2 text-white transition hover:bg-[#4f7c5d]",
  editButton:
    "cursor-pointer rounded-md border-0 bg-[#7f9f85] px-4 py-2 text-white transition hover:bg-[#6c8d72]",
  cancelButton:
    "cursor-pointer rounded-md border-0 bg-[#dcdcdc] px-4 py-2 transition hover:bg-[#cfcfcf]",
  dangerButton:
    "mr-2.5 mt-4 cursor-pointer rounded-md border-0 bg-[#d9534f] px-4 py-2 text-white transition hover:bg-[#c74440]",
  table: "mt-4 w-full border-collapse overflow-hidden text-left text-sm",
  tableHead: "bg-[#e2e7e2]",
  tableHeader: "p-3 font-semibold text-[#2f3e2f]",
  tableCell: "border-b border-[#eee] p-3 align-top",
  alertItem: "mt-3 rounded-[14px] bg-[#f6f7f6] p-4",
  bookingCard: "mt-3 rounded-xl border border-[#d9e3d9] bg-[#f8faf8] p-4",
  primarySmall:
    "mt-2.5 cursor-pointer rounded-md border-0 bg-[#5c8d6a] px-3 py-1.5 text-white transition hover:bg-[#4f7c5d]",
  rejectSmall:
    "mt-2.5 mr-2.5 cursor-pointer rounded-md border-0 bg-[#d9534f] px-3.5 py-2 text-white transition hover:opacity-90",
  acceptSmall:
    "mt-2.5 mr-2.5 cursor-pointer rounded-md border-0 bg-[#5c8d6a] px-3.5 py-2 text-white transition hover:opacity-90",
};

export const statusClass = (status = "pending") => {
  const base = "rounded-[10px] px-3 py-1.5 text-xs capitalize";

  if (status === "complete" || status === "completed") {
    return `${base} bg-[#d7ddd7]`;
  }

  if (status === "progress" || status === "accepted") {
    return `${base} bg-[#cfe3d1]`;
  }

  return `${base} bg-[#ead9b5]`;
};
