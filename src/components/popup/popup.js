import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../network/axiosInstance";
import { getOffersAction } from "../../Store/Actions/getOffers";

export default function Popup(props) {
  const [offerForm, setOfferForm] = useState({
    details: "",
    from_region: "",
    to_region: "",
    price: "",
    // status: 'None',
    post: props.postID,
    offer_owner: 1,
  });
  const [errors, setErrors] = useState({
    detailsErr: null,
    from_regionErr: null,
    to_regionErr: null,
    priceErr: null,
  });

  const [offers, setOffers] = useState([]); 
  
  //-------------------------------------------------------
  const offerArray = useSelector((state) => state.OFFERS.offers); //[]
  console.log("ahhhhhhhhhhhhhhh", offerArray)
  const dispatch = useDispatch();
  const AddToOffers = (array) => {
    dispatch(getOffersAction(array));
  };
  useEffect(() => {
    axiosInstance
      .get(`/offers/`, {
      })
      .then((res) => setOffers(res.data))
      .catch((err) => console.log(err));
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    // () => AddToOffers(offerForm)
    // SEND API REQUEST
    axiosInstance
      .post("/offers/", offerForm)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
      // AddToOffers(offers) 
    return console.log("send offer successfully:  ", offerArray);
  };
  const changeData = (e) => {
    if (e.target.name === "details") {
      setOfferForm({
        ...offerForm,
        details: e.target.value,
      });
      setErrors({
        ...errors,
        detailsErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "from_region") {
      setOfferForm({
        ...offerForm,
        from_region: e.target.value,
      });
      setErrors({
        ...errors,
        from_regionErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "to_region") {
      setOfferForm({
        ...offerForm,
        to_region: e.target.value,
      });
      setErrors({
        ...errors,
        to_regionErr:
          e.target.value.length === 0 ? "This field is required" : null,
      });
    } else if (e.target.name === "price") {
      setOfferForm({
        ...offerForm,
        price: e.target.value,
      });
      setErrors({
        ...errors,
        priceErr: e.target.value.length === 0 ? "This field is required" : null,
      });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
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
              <form onSubmit={(e) => submitForm(e)}>
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
                    required
                  />
                  <div id="usernameHelp" className="form-text text-danger">
                    {errors.detailsErr}
                  </div>
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
                    required
                  />
                </div>
                <div id="usernameHelp" className="form-text text-danger">
                  {errors.from_regionErr}
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
                    required
                  />
                </div>
                <div id="usernameHelp" className="form-text text-danger">
                  {errors.to_regionErr}
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
                    required
                  />
                </div>
                <div id="usernameHelp" className="form-text text-danger">
                  {errors.priceErr}
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
                    value={props.postID}
                    onChange={(e) => changeData(e)}
                    name="post_id"
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                    onClick={() => AddToOffers(offerForm)}
                    disabled = {errors.detailsErr || errors.from_regionErr || errors.to_regionErr || errors.priceErr}
                  >
                    Send Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Offer Status
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Your Offer is successfully sent</div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <a
        className="btn btn-primary"
        data-bs-toggle="modal"
        href="#exampleModalToggle"
        role="button"
      >
        Make Offer
      </a>
    </>
  );
}
