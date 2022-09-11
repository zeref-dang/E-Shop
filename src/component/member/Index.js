import Login from "./Login"
import Regiester from "./Register"

function Index(props) {
    return (
        <section id="form">
            <div className="container">
                <div className="row">
                    <Login />
                    <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                    </div>
                    <Regiester />
                </div>
            </div>
        </section>
    )
}
export default Index