import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAFkZ6D2f8O7g-et1VUXHdX7SWSbB_PNSU',
  authDomain: 'test-de530.firebaseapp.com',
  projectId: 'test-de530',
  storageBucket: 'test-de530.appspot.com',
  messagingSenderId: '847374011352',
  appId: '1:847374011352:web:df0884b079d52baa4440ad',
};

const gitHub = document.querySelector('#gitHub');
const facebook = document.querySelector('#facebook');
const google = document.querySelector('#google');
const exit = document.querySelector('#exit');
const menu = document.querySelector('#login');
const socialLinks = document.querySelector('#links');

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const onHandleGoogle = async () => {
  socialLinks.classList.add('is-hidden');
  await signInWithPopup(auth, googleProvider)
    .then(result => {
      localStorage.setItem('user', JSON.stringify(result.user));
      exit.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log('sorry');
    });
};

const onHandleGitHub = async () => {
  socialLinks.classList.add('is-hidden');
  await signInWithPopup(auth, githubProvider)
    .then(result => {
      localStorage.setItem('user', JSON.stringify(result.user));
      exit.classList.remove('is-hidden');
    })
    .catch(error => {});
};

const onHandleFacebook = async () => {
  console.log('asfa');
  socialLinks.classList.add('is-hidden');
  await signInWithPopup(auth, facebookProvider)
    .then(result => {
      console.log('safasf');
      localStorage.setItem('user', JSON.stringify(result.user));
      exit.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log(error);
    });
};

const onHandleSignOut = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
      menu.classList.remove('is-hidden');
      exit.classList.add('is-hidden');
    })
    .catch(error => {
      console.log(error);
    });
};

onAuthStateChanged(auth, user => {
  if (user !== null) {
    menu.classList.add('is-hidden');
    socialLinks.classList.add('is-hidden');
    exit.classList.remove('is-hidden');
  } else {
    localStorage.removeItem('user');
  }
});

const onHandleClickMenu = () => {
  socialLinks.classList.toggle('is-hidden');
};

menu.addEventListener('click', onHandleClickMenu);
google.addEventListener('click', onHandleGoogle);
gitHub.addEventListener('click', onHandleGitHub);
facebook.addEventListener('click', onHandleFacebook);
exit.addEventListener('click', onHandleSignOut);

export {
  onHandleGoogle,
  onHandleGitHub,
  onHandleFacebook,
  onHandleSignOut,
  onAuthStateChanged,
  onHandleClickMenu,
};
