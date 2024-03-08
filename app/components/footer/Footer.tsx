import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Kategori Toko</h3>
            <Link href="#">Alat Kamar Tidur</Link>
            <Link href="#">Alat Pembersih</Link>
            <Link href="#">Alat Elektronik</Link>
            <Link href="#">Jam</Link>
            <Link href="#">Speaker</Link>
            <Link href="#">Peralatan Dapur</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Layanan Pelanggan</h3>
            <Link href="#">Hubungi Kami</Link>
            <Link href="#">Kebijakan Pengiriman</Link>
            <Link href="#">Pengembalian & Penukaran</Link>
            <Link href="#">Pertanyaan</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">Tentang Kami</h3>
            <p className="mb-2">
              Zivana Store merupakan tempat penjualan barang barang grosir 
              peralatan rumah tangga yang ada di Kota Bengkulu, adapun untuk
              pembelian online bisa dilakukan di website ini.
            </p>
            <p>&copy; {new Date().getFullYear()} Zivana-Store. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Ikuti Kami</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
