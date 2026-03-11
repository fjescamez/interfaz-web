import { useState, useEffect, useRef } from "react";
import "./LoginPage.css";
import { useSession } from "../context/SessionContext";
import { notify } from "../helpers/notify";
import { useTabs } from "../context/TabsContext";

function LoginPage() {
  const { session, setSession } = useSession();
  const loginForm = useRef(null); // Referencia al contenedor
  const { createTab } = useTabs();
  const urlApi = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (session) {
      if (session.departments.includes("Solido") || session.departments.includes("Liquido") || session.departments.includes("Montaje")) {
        createTab("/produccion", "PRODUCCION");
      } else {
        createTab("/home", "INICIO");
      }
    }
  }, [session]);

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.username === "" || user.password === "") {
      setError(true);
      if (loginForm.current) {
        loginForm.current.classList.remove("shake");
        // Fuerza el reflow para reiniciar la animación si ya estaba
        void loginForm.current.offsetWidth;
        loginForm.current.classList.add("shake");
      }
      return;
    }

    try {
      const response = await fetch(`${urlApi}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!data.message) {
        localStorage.setItem('session', JSON.stringify(data.user));
        setSession(data.user);
        notify("success", "Sesión iniciada con éxito");

      } else {
        notify(data.status, data.title, data.message);
        if (loginForm.current) {
          loginForm.current.classList.remove("shake");
          // Fuerza el reflow para reiniciar la animación si ya estaba
          void loginForm.current.offsetWidth;
          loginForm.current.classList.add("shake");
        }
        return;
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      return;
    }
  };

  return (
    <div className="cuerpoLogin">
      <div className="contenedor">
        <main>
          <div className="login" ref={loginForm}>
            <a className="login__contenedor-logo" href="https://www.disengraf.com/">
              <img className="login__logo" src="/assets/LOGO-SOLO.png" alt="logo_disengraf" />
            </a>

            <form onSubmit={handleSubmit}>
              <div className="login__input">
                <img className="login__icono" src="/assets/icon_user.png" alt="icono_usuario" />
                <input
                  className="login__caja"
                  type="text"
                  name="usuario"
                  placeholder="Nombre de usuario"
                  value={user.username}
                  onChange={e => setUser({ ...user, username: e.target.value })}
                />
              </div>
              <div className="login__input">
                <img className="login__icono" src="/assets/icon_candado.png" alt="icono_usuario" />
                <input
                  className="login__caja"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={user.password}
                  onChange={e => setUser({ ...user, password: e.target.value })}
                />
              </div>

              {error && <div className="errorLogin">Completa todos los campos</div>}

              <div className="login__recuerdame-olvidaste">
                <div className="login__recuerdame">
                  <input id="recuerdame" type="checkbox" />
                  <label htmlFor="recuerdame">Recuérdame</label>
                </div>
                <a href="#">¿Olvidaste la contraseña?</a>
              </div>
              <input className="login-boton" type="submit" name="iniciar-sesion" value="Iniciar Sesión" />
            </form>

          </div>
        </main>

        <footer className="footer">
          <img className="logo" src="/assets/logo-just.png" alt="logo-just" />
          <img className="logo" src="/assets/logo-epson.png" alt="logo-epson" />
          <img className="logo" src="/assets/logo-esko.png" alt="logo-esko" />
          <img className="logo" src="/assets/logo-apple.png" alt="logo-apple" />
          <img className="logo" src="/assets/logo-dupont-cyrel.png" alt="logo-dupont-cyrel" />
          <img className="logo" src="/assets/logo-dupont.png" alt="logo-dupont" />
          <img className="logo" src="/assets/logo-kodak.png" alt="logo-kodak" />
        </footer>
      </div>
    </div>
  )
}

export default LoginPage