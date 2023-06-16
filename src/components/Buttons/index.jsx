import { Button } from 'primereact/button';

export class Buttons {

  newObject(item , onClick) {
    return <Button label={item} severity="success" onClick={onClick} />
  }

  editObject() {
    return <Button label="Info" severity="info" />
  }

  deleteObject() {
    return <Button label="Danger" severity="danger" />
  } 
}


