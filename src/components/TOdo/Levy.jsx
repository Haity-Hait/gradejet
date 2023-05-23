import { CheckCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faCircleCheck, faPen, faTrashCan
// } from '@fortawesome/free-solid-svg-icons'

const Levy = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  return(
    <>
      {toDo && toDo
      .sort((a, b) => a.id > b.id ? 1 : -1)
      .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
            <div className="col taskBg  border">
              <div className={ task.status ? 'done' : '' }>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span title="Completed / Not Completed"
                  onClick={ (e) => markDone(task.id) }
                >
                  {/* <FontAwesomeIcon icon={faCircleCheck} /> */}
                  <CheckCircleIcon className='w-6' />
                </span>

                {task.status ? null : (
                  <span title="Edit"
                    onClick={ () => setUpdateData({ 
                      id: task.id, 
                      title: task.title, 
                      status: task.status ? true : false
                    }) }
                  >
                    {/* <FontAwesomeIcon icon={faPen} /> */}
                    <PencilIcon className='w-6' />
                  </span>
                )}

                <span title="Delete"
                  onClick={() => deleteTask(task.id)}
                >
                  {/* <FontAwesomeIcon icon={faTrashCan} /> */}
                  <TrashIcon className='w-6' />
                </span>
              </div>
            </div>
          </React.Fragment>
        )
      })
      }  
    </>
  )
}

export default Levy;