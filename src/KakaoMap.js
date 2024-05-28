import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useAddress from "./hooks/useLocation";

const MapContainer = styled.div`
  width: 50vh;
  height: 50vh;
`;

const AppContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex: 1; /* 입력창이 확장되도록 함 */
  display: flex;
  align-items: center;
`;

const InfoWindowContainer = styled.div`
  position: fixed;
  top: 140px;
  right: 20px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 260px;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
`;

const InfoWindowContent = styled.div`
  padding: 10px;
  font-size: 16px;
`;

const KakaoMap = ({ moim }) => {
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(moim?.location);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울의 기본 좌표
      level: 3,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);

    if (moim?.location) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(moim.location, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            map: kakaoMap,
            position: coords,
          });
          setMarkers([marker]);
          kakaoMap.setCenter(coords);
        }
      });
    }
  }, [moim]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (map && searchQuery) {
      const places = new window.kakao.maps.services.Places();

      markers.forEach((marker) => marker.setMap(null));

      places.keywordSearch(searchQuery, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const newMarkers = data.map((place) => {
            const placeMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(place.y, place.x),
            });

            placeMarker.setMap(map);
            window.kakao.maps.event.addListener(placeMarker, "click", () => {
              setSelectedPlace(place);
            });

            return placeMarker;
          });
          setMarkers(newMarkers);
        }
      });
    }
  };

  return (
    <AppContainer>
      <MapContainer ref={mapRef}></MapContainer>
<<<<<<< HEAD
=======
      {/* <SearchContainer>
        <InputWrapper>
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchButtonClick();
              }
            }}
          />
        </InputWrapper>
        <Button onClick={handleSearchButtonClick}>확인</Button>
      </SearchContainer> */}
>>>>>>> 259458ff33e083289bd2003ca6bdfc90cd6a6687
      {selectedPlace && (
        <InfoWindowContainer>
          <InfoWindowContent>
            <strong>{selectedPlace.place_name}</strong>
            <br />
            주소: {selectedPlace.address_name}
            <br />
            전화번호: {selectedPlace.phone}
          </InfoWindowContent>
        </InfoWindowContainer>
      )}
    </AppContainer>
  );
};

export default KakaoMap;
