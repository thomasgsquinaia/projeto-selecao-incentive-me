import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

export default function Home() {
    return (
        <div className="containerHome">
            {/* header */}
            <div> 
                <Header/> 
            </div>
            {/* sidebar */}
            <div className="content"> 
                <SideBar pageName="Home"/> 
            </div>
        </div>
    )
}