import React, { useEffect, useState } from 'react';
import Tts from 'react-native-tts';
import Stepper from '../../components/stepper';
import ListSelector from '../../components/list-selector';
import storage from '../../utils/storage';


const TTSEngineScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [engines, setEngines] = useState([]);
  const [selectedEngeine, setSelectedEngine] = useState({});


  /**
   * Get bluetooth paried devices
   * 
   */
  const getEngines = async () => {
    Tts.getInitStatus()

    // get all available voices
      .then(() => Tts.engines())

    // get all arabic voices
      .then(engines => setEngines(engines))

      .finally(() => setIsLoading(false));
  }

  /**
   * ON Screen Mount
   * 
   */
  useEffect(() => { getEngines() }, [])

  /**
   * Try `getPairedDevices` again.
   * 
   */
  const refresh = () => {
    getEngines();
  }

  const selectEngine = engine => {
    setSelectedEngine(engine);
    console.log(engine);
  }

  const confirmSelection = () => {
    console.log({ selectedEngeine });

    Tts.setDefaultEngine(selectedEngeine.name);
    storage.set('tts:engine', {
      name: selectedEngeine.name,
      label: selectedEngeine.label,
    });
    navigation.navigate('voices');
  }


  return (<>
    <ListSelector
      listTitle='اختر محرك التحدث'
      data={engines}
      isLoading={isLoading}
      error={error}
      onItemPress={selectEngine}
      itemTitleKey='label'
      currentItem={selectedEngeine}
      onRefresh={refresh}
    />
    <Stepper
      onNextPress={confirmSelection}
      NextDisabled={!selectedEngeine.name} 
    />
  </>)
}


export default TTSEngineScreen;