import React from "react";
import DaumPostcode from "react-daum-postcode";
import Btn from "./Btn";

const PostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    props.setAddress(fullAddress);

    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "10%",
    width: "600px",
    height: "600px",
    padding: "7px",
  };

  return (
    <div>
      <DaumPostcode
        style={postCodeStyle}
        onComplete={handlePostCode}
        defaultQuery={props.defaultQuery}
      />
      <Btn
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </Btn>
    </div>
  );
};

export default PostCode;
