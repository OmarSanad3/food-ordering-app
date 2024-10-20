import Order from "../../components/Order/Order";
export default function Menu() {
  return (

    <div className="container">
      <div className="row d-flex flex-column">
        
        <div className="col-md-6">
          <Order />
        </div>
        
        <div className="col-md-6">
          <Order />
        </div>
        <div className="col-md-6">
          <Order />
        </div>
        <div className="col-md-6">
          <Order />
        </div>
        <div className="col-md-6">
          <Order />
        </div>

      </div>
    </div>
  )
}
