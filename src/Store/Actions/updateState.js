
export const updateStateAction = (payload, booleanVar) => {
    return {
      type: "UPDATE_OFFER_STATE",
      payload,
      booleanVar,
    };
  };
  
export const deleteOffer = (payload) => {
  return {
    type: "DELETE_OFFER",
    payload,
  };
};
  