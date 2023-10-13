export default function Prueba() {
    var nuevoDiv;
    const Click = () => {
        nuevoDiv = <div>Hola</div>;
      }

    return (
        <div>
            <button onClick={Click}>Crear Div</button>
            <div id="contenedor">{nuevoDiv}</div>
        </div>
    );
}
