import React, {  useEffect, useState } from 'react';
import { Form, Item, GroupItem, Label } from 'devextreme-react/form';
import { TextBox } from 'devextreme-react';
import { DateBox } from 'devextreme-react/date-box';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';

const buttonStyle = {
  backgroundColor: 'orange',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  margin: '5px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '16px',
};

const AddEventForm = ({ events, setEvents}) => { 
  const [numevent, setNumevent] = useState('');
  const [dateevent, setDateevent] = useState('');
  const [datefinevent, setDatefinevent] = useState('');
  const [datejour, setDatejour] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);    


  function generateId() {
    const timestamp = new Date().getTime(); // Get the current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const uniqueId = `${timestamp}-${randomNum}`; // Combine timestamp and random number to create a unique ID
  
    return uniqueId;
  }


  const handleSubmit = async (e) => {


    const eventData = {
      "_id": generateId(),
      "numevent": numevent,
      "dateevent": dateevent,
      "datefinevent": datefinevent,
      "datejour": datejour
    };

    setEvents([...events, eventData])
  };

  useEffect(()=>{
    console.log("datefinevent : ", datefinevent)
   }, [datefinevent])


  const handleEdit = async (id) => {
    const updatedEventData = {
      "_id": "id",
        "numevent": "numevent",
        "dateevent": "dateevent",
        "datefinevent": "datefinevent",
        "datejour": "datejour"
    };

    
    const updatedEvents = events.map(event => 
        event._id === id ? updatedEventData : event
    );
    console.log(updatedEventData._id)

  
    setEvents(updatedEvents);
    console.log(updatedEventData)
};

  const handleDelete = async (id) => {
    setEvents(events.filter(event => event._id !== id));
  };

  const formData = { numevent, dateevent, datefinevent, datejour };

  return (
    <div>
        <Form formData={formData}>
          <GroupItem colCount={4} caption="Event Details">
            <Item dataField="numevent">
              <Label text="Numevent" />
              <TextBox value={numevent} onValueChanged={(e) => setNumevent(e.value)} />
            </Item>
            <Item dataField="dateevent" editorType="dxDateBox">
              <Label text="Date Event" />
              <DateBox value={dateevent} onValueChanged={(e) => setDateevent(e.value)} />
            </Item>
            <Item dataField="datefinevent" editorType="dxDateBox">
              <Label text="Date Fin Event" />
              <DateBox value={datefinevent} onValueChanged={(e) => setDatefinevent(e.value)} />
            </Item>
            <Item dataField="datejour" editorType="dxDateBox">
              <Label text="Date Jour" />
              <DateBox value={datejour} onValueChanged={(e) => setDatejour(e.value)} />
            </Item>
            <Item horizontalAlignment="right">
              <button style={buttonStyle} onClick={() => handleSubmit()}>{editingEvent ? 'Update Event' : 'Add Event'}</button>
            </Item>
          </GroupItem>
        </Form>

      <div id="data-grid-demo">
        <h2>Events List</h2>
        <DataGrid
          dataSource={events}
          // keyExpr="_id"
          showBorders={true}
        >
          <Paging enabled={false} />

          <Column dataField="numevent" caption="Num Event" />
          <Column dataField="dateevent" caption="Date Event" dataType="date" />
          <Column dataField="datefinevent" caption="Date Fin Event" dataType="date" />
          <Column dataField="datejour" caption="Date Jour" dataType="date" />
          <Column
            caption="Actions"
            cellRender={(cellData) => (
              <div>
                { <button style={buttonStyle} onClick={() => handleEdit(cellData.data._id)}>Edit</button> }
                <button style={buttonStyle} onClick={() => handleDelete(cellData.data._id)}>Delete</button>
              </div>
            )}
          />
        </DataGrid>
      </div>
    </div>
  );
};

export default AddEventForm;
