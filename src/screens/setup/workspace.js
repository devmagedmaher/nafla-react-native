import React, { useEffect, useState } from 'react';
import { fetchWorkspaces } from '../../services/ibm-watson';
import Stepper from '../../components/stepper';
import ListSelector from '../../components/list-selector';
import storage from '../../utils/storage';


const WorkspaceScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkpsace] = useState({});


  /**
   * Get Workspaces from api
   * 
   */
  const getWorkspaces = async () => {
    setIsLoading(true);
    
    fetchWorkspaces()
      .then(({ data }) => setWorkspaces(data))

      .catch(error => {
        console.log(error);
        setError(error.message);
      })

      .finally(() => setIsLoading(false));
  }

  /**
   * ON Screen Mount
   * 
   */
  useEffect(() => { getWorkspaces() }, [])

  /**
   * Try `getWorkspaces` again.
   * 
   */
  const refresh = () => {
    setError(null);
    getWorkspaces();
  }

  const selectWorkspace = workspace => {
    setSelectedWorkpsace(workspace);
  }

  const confirmSelection = () => {
    storage.set('workspace', {
      id: selectedWorkspace.workspace_id,
      name: selectedWorkspace.name,
    });
    navigation.navigate('bluetooth');
  }


  return (<>
    <ListSelector
      listTitle='اختر الروبوت'
      data={workspaces}
      isLoading={isLoading}
      error={error}
      onItemPress={selectWorkspace}
      currentItem={selectedWorkspace}
      onRefresh={refresh}
    />
    <Stepper
      onNextPress={confirmSelection}
      NextDisabled={!selectedWorkspace.id}
    />
  </>)
}


export default WorkspaceScreen;