import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import Footer from "./component/Layout/Footer";
import Head from "./component/Layout/Head";
import Menuleft from "./component/Layout/Menuleft";
import MenuAccount from "./component/member/MenuAccount";
import { useState } from "react";
function App(props) {
  let params1 = useLocation()
  const [count, setCount] = useState()
  const [dem, setDem] = useState()
  function countCart (data) {
      setCount(data)
  }
  function countWish (data) {
      setDem(data)
  }
  return (
    <UserContext.Provider value = {{
      count: count,
      dem: dem,
      countCart: countCart,
      countWish: countWish,
    }}>
      <>
        <Head />
        <section>
          <div className='container'>
            <div className="row">
              {params1['pathname'].includes('Account') ? <MenuAccount /> : <Menuleft />}
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </>
    </UserContext.Provider>
  );
}
export default App;
