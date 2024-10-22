import img from "../../assets/dish1.webp";
import styles from "./Order.module.css";

export default function Order({ title , image , description , price}) {
  return (
    <>
    <div className="d-flex pt-2 pb-2 gap-3 ">
      <img src={img} alt="" style ={{height:"40px"}} className = "me-2" />

      <div className="item-name " style={{width : "100%"}}>
        <h4 className ="fs-6" >{title}</h4>
        <p className = {`text-black-50`} >
          {description}
        </p>
      </div>
      <div className="price d-flex justify-content-end">
        <div style={{maxWidth : "100%"}} >EGP {price}</div>
        <i className="bi bi-plus-circle-fill text-warning"></i>
      </div>
    </div>
      <hr className = "m-0"/>
      </>
  );
}
