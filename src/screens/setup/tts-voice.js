import React, { useContext, useEffect, useState } from 'react';
import Tts from 'react-native-tts';
import Stepper from '../../components/stepper';
import ListSelector from '../../components/list-selector';
import storage from '../../utils/storage';
import FirstTimerContext from '../../context/first-timer';


const TTSVoiceScreen = ({ navigation }) => {
  const firstTimer = useContext(FirstTimerContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState({});


  /**
   * Get bluetooth paried devices
   * 
   */
  const getVoices = async () => {
    Tts.getInitStatus()

      .then(() => Tts.setDefaultLanguage('ar'))

    // get all available voices
      .then(() => Tts.voices())

    // get arabic voices
      .then(voices => voices.filter(e => e.language.startsWith('ar')))

    // get all arabic voices
      .then(voices => setVoices(voices))

      .finally(() => setIsLoading(false));
  }

  /**
   * ON Screen Mount
   * 
   */
  useEffect(() => { getVoices() }, [])

  /**
   * Try `getPairedDevices` again.
   * 
   */
  const refresh = () => {
    getVoices();
  }

  const selectVoice = voice => {
    
    if (voice === selectedVoice) {
      Tts.stop();
      Tts.speak('مرحبا');
    }
    else {
      Tts.setDefaultVoice(voice.id);
    }
    
    setSelectedVoice(voice);
  }

  const confirmSelection = () => {
    Tts.setDefaultVoice(selectedVoice.name);
    storage.set('tts:voice', {
      id: selectedVoice.id,
      name: selectedVoice.name,
    });
    storage.set('is_old_user', true);
    firstTimer.set(false);
  }


  return (<>
    <ListSelector
      listTitle='اختر صوت المتحدث'
      data={voices}
      isLoading={isLoading}
      error={error}
      onItemPress={selectVoice}
      currentItem={selectedVoice}
      onRefresh={refresh}
    />
    <Stepper
      onNextPress={confirmSelection}
      NextDisabled={!selectedVoice.id}
    />
  </>)
}


export default TTSVoiceScreen;