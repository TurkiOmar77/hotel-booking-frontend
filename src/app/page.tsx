import Footer from "@/components/footer";
import ListRooms from "@/components/listRoms";
import Navbar from "@/components/Navbar";
import SectionWelcome from "@/components/sectionWelcome";

export default function Home() {
  return (
    <>
    <Navbar/>
    <SectionWelcome/>
    <ListRooms />
    <Footer/>
    </>
  );
}
