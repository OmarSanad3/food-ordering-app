

export default function Cart() {
  return <>
    
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-header py-3 bg-warning ">
          <h5 className="mb-0 text-white">Your Cart</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Products
              <span>$53.98</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>Gratis</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Total amount</strong>
                <p className="mb-0">(including VAT)</p>
              </div>
              <span><strong>$53.98</strong></span>
            </li>
          </ul>
          <button type="button" className="btn btn-primary bg-warning btn-lg btn-block">
            Go to checkout
          </button>
        </div>
      </div>
    </div>
    </>
};
