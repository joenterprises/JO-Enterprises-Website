import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://joenterprises-printshop.co.in"),
  title: "JO Enterprises | Printing & Design",
  description:
    "Premium printing, invitations, business stationery, promotional products and digital design from JO Enterprises.",
  alternates: {
    canonical: "https://joenterprises-printshop.co.in",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
