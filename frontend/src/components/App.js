import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as apiAuthorize from "../utils/apiAuthorize";
import { setToken } from "../utils/token";
import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedLoggedIn = localStorage.getItem("loggedIn");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (token && storedLoggedIn === "true" && storedUserEmail) {
      setLoggedIn(true);
      setUserEmail(storedUserEmail);
      navigate("/"); // Перенаправление пользователя на главную страницу после успешной авторизации
    }
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const openInfotooltip = ({ type, text }) => {
    setNotification({ type, text });
    setIsInfoTooltipOpen(true);
    setTimeout(() => {
      setIsInfoTooltipOpen(false);
    }, 1500);
  };

  const handleLogin = async (email, password) => {
    try {
      console.log('Attempting to log in with email:', email);
      console.log('Sending login request with email and password:', email, password);
  
      const data = await apiAuthorize.authorize(email, password);
      console.log('Server response data:', data);

      if (data.data.id) {
        console.log('User data:', data.data);
        
        // Сохраняем информацию в локальное хранилище
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("token", data.token);

        console.log('Successful login. Received token:', data.token);
        setToken(data.token);
        setLoggedIn(true);
        setUserEmail(email);

        console.log('loggedIn:', loggedIn);
        navigate("/");
      }
    } catch (err) {
      console.error('Error during login:', err);
      openInfotooltip({
        type: "error",
        text: "Что-то пошло не так! Попробуйте ещё раз.",
      });
    }
  };  
  

  const handleRegister = (email, password) => {
    handleSubmit(() =>
      apiAuthorize
        .register(email, password)
        .then(() => {
          openInfotooltip({
            type: "success",
            text: "Вы успешно зарегистрировались!",
          });
          navigate("/sign-in", { replace: true });
        })
        .catch((error) => {
          openInfotooltip({
            type: "error",
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
          console.error("Ошибка регистрации:", error);
        })
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      apiAuthorize
        .checkToken(token)
        .then((response) => {
          setLoggedIn(true);
          setUserEmail(response?.data?.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onSignOut = () => {
    // Удаляем информацию из локального хранилища
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");

    setLoggedIn(false);
    setUserEmail("");
    navigate("/sign-in");
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeletePopupClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleConfirmDelete() {
    if (cardToDelete) {
      handleCardDelete(cardToDelete);
    }
    setIsDeletePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
      });
  }

  function handleCardDelete(card) {
    handleSubmit(() => {
      return api.deleteCardApi(card._id).then(() => {
        setCards((prevState) => prevState.filter((c) => c._id !== card._id));
      });
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    handleSubmit(() => api.editApiProfile(name, about).then(setCurrentUser));
  }

  function handleUpdateAvatar(newAvatar) {
    handleSubmit(() => api.editAvatar(newAvatar.avatar).then(setCurrentUser));
  }

  function handleSubmit(request) {
    setIsLoading(true);

    return request()
      .then(() => {
        closeAllPopups();
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    handleSubmit(() =>
      api.addNewCardApi(name, link).then((newPlace) => {
        setCards([newPlace, ...cards]);
      })
    );
  }

  useEffect(() => {
    if (loggedIn) {
      // Выполняем запрос за данными пользователя
      api
        .getApiUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]); // loggedIn включен в массив зависимостей

  useEffect(() => {
    if (loggedIn) {
      // Выполняем запрос за карточками
      api
        .getAllCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log("Ошибка:", err);
        });
    }
  }, [loggedIn]); // loggedIn включен в массив зависимостей

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onSignOut={onSignOut}
          loggedIn={loggedIn}
          userEmail={userEmail}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                setCards={setCards}
                onCardDelete={handleCardDelete}
                onDeletePopupClick={handleDeletePopupClick}
                onSignOut={onSignOut}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate replace to="/sign-in" />} />
        </Routes>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />

        <EditProfilePopup
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          closeAllPopups={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          closeAllPopups={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          closeAllPopups={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          isDeletePopupOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={() =>
            Promise.resolve(handleConfirmDelete()).catch(() => {})
          }
          isDeleting={isDeleting}
        />

        <InfoTooltip
          isInfoTooltipOpen={isInfoTooltipOpen}
          closeAllPopups={closeAllPopups}
          notification={notification}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
