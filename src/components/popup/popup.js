import React from "react";
import { useState } from "react";

export default function Popup(props) {
  const [offerForm, setOfferForm] = useState({
    details: "",
    from_region: "",
    to_region: "",
    price: "",
    post: "",
  });
  const changeData = (e) => {
    if (e.target.name === "details") {
      setOfferForm({
        ...offerForm,
        details: e.target.value,
      });
     
    } else if (e.target.name === "from_region") {
      setOfferForm({
        ...offerForm,
        from_region: e.target.value,
      });
     
    } else if (e.target.name === "to_region") {
      setOfferForm({
        ...offerForm,
        to_region: e.target.value,
      });
    
    } else if (e.target.name === "price") {
      setOfferForm({
        ...offerForm,
        price: e.target.value,
      });
     
    }
  }
      
    
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Make Offer
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Make Your Offer 
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2 mr-5">
                  <label
                    htmlFor="exampleInputFirstname1"
                    className="form-label"
                  >
                    Details
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="detailsID"
                    aria-describedby="detailsHelp"
                    value={offerForm.details}
                    onChange={(e) => changeData(e)}
                    name="details"
                  />
                </div>

                <div className="mb-2 mr-5">
                  <label
                    htmlFor="exampleInputFirstname1"
                    className="form-label"
                  >
                    From Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="from_regionID"
                    aria-describedby="from_regionHelp"
                    value={offerForm.from_region}
                    onChange={(e) => changeData(e)}
                    name="from_region"
                  />
                </div>

                <div className="mb-2 mr-5">
                  <label
                    htmlFor="exampleInputFirstname1"
                    className="form-label"
                  >
                    To Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="to_regionID"
                    aria-describedby="to_regionHelp"
                    value={offerForm.to_region}
                    onChange={(e) => changeData(e)}
                    name="to_region"
                  />
                </div>

                <div className="mb-2 mr-5">
                  <label
                    htmlFor="exampleInputFirstname1"
                    className="form-label"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="priceID"
                    aria-describedby="priceHelp"
                    value={offerForm.price}
                    onChange={(e) => changeData(e)}
                    name="price" 
                  />
                </div>

                <div className="mb-2 mr-5">
                  <label
                    htmlFor="exampleInputFirstname1"
                    className="form-label"
                  >
                    Post ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="post_idID"
                    aria-describedby="post_idHelp"
                    value= {props.postID}
                    onChange={(e) => changeData(e)}
                    name="post_id"
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Send Offer
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  }
