import React from "react";

export default function Demo() {
    return (
        <div className="App">
        <header className="App-header">
          <h1>Mi Página de Presentación</h1>
        </header>
  
        <section className="App-section">
          <h2>Sobre Mí</h2>
          <p>Hola, soy [Tu Nombre]. Bienvenido a mi página de presentación. Puedes encontrar información sobre mí y mis intereses aquí.</p>
        </section>
  
        <section className="App-section">
          <h2>Mis Intereses</h2>
          <p>Me apasiona [tus intereses]. Disfruto de [actividades, hobbies, etc.].</p>
        </section>
  
        <section className="App-section">
          <h2>Contacto</h2>
          <p>Puedes contactarme a través de mi correo electrónico: <a href="mailto:tu@email.com">tu@email.com</a></p>
        </section>
  
        <footer className="App-footer">
          <p>&copy; 2023 Mi Página de Presentación</p>
        </footer>
      </div>
    );
}
