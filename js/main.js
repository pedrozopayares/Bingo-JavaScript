(
    function(){

        let systemMessages = document.getElementById('system-messages');
        let bingoButton = document.getElementById('bingo-button');
        let bingoImage = document.getElementById('bingo-image');
        let winnerWord = document.getElementById('winner-word');
        let consoleMessages = document.getElementById('console');
        let inputFile = document.getElementById('data-file');
        let selectedFile;
        let wordsToBingo;
        let tickSound = new Audio('snd/tick.mp3');  // Create audio object and load desired file.
        let backgroundSound = new Audio('snd/configuration.mp3');  // Create audio object and load desired file.
        var bodyClicked = false;

        function playClickSound() {
            // Stop and rewind the sound (stops it if already playing).
            tickSound.pause();
            tickSound.currentTime = 0;
            // Play the sound.
            tickSound.play();
        }

        function playBackgroundSound() {
            backgroundSound.pause();
            backgroundSound.loop = true;
            backgroundSound.currentTime = 0;
            backgroundSound.volume = 0.5;
            backgroundSound.play();
        }

        inputFile.addEventListener("change", readFiles, false);
        systemMessages.innerHTML = "No ha realizado carga de palabras.";

        function readFiles() {
            if(bodyClicked == false) {
                playBackgroundSound();
                bodyClicked = true;
            }
            selectedFile = this.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {extractWords(e);};
            reader.readAsText(selectedFile);
        }

        function extractWords(file) {
            wordsToBingo = file.target.result.split(/\r?\n/);
            console.log(wordsToBingo);
        }

        bingoButton.addEventListener("click", bingo, false);

        function bingo() {
            playClickSound();
            if (wordsToBingo.length > 0) {
                selectedWord = selectRandomWord();
                showRandomWord(selectedWord.word);
                speakSelectedWord(selectedWord.word);
                excludeFromAvalibleWords(selectedWord.index);
                console.log(wordsToBingo);
                bingoImage.src="img/tenor.gif";
            } else {
                systemMessages.innerHTML = "No hay más palabras para sortear el Bingo";
                bingoImage.src="img/bingo.jpg";
            }
        }

        function selectRandomWord() {
            let index = getRandomArbitrary(0, wordsToBingo.length);
            return {'word': wordsToBingo[index], 'index': index};
        }

        function showRandomWord(wordToShow) {
            winnerWord.innerHTML = wordToShow;
            consoleMessages.innerHTML += wordToShow + ', ';
            systemMessages = "¡Búsca esta palabra en tu tarjeta!"
        }

        function speakSelectedWord(textToSpeak) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = textToSpeak;
            window.speechSynthesis.speak(msg);
        }

        function excludeFromAvalibleWords(index) {
            wordsToBingo.splice(index, 1);
        }

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        // Actitude!
        // This part of the app is to motivate the participants
        // across bingo game sessions.
        let actitude = [
            '¡Estás salao!',
            '¿Ajá y qué?',
            '¡Ponte pálido Papi!',
            '¡Maalo Maloo, me falta una!',
            '¡Esto está feo!',
            '¡Naranjas chinas!',
            '¡Dame razón veee!',
            '¡Estoy que canto!',
            '¡Quedaste picao!',
            '¡Mira tu eso!',
            '¡Huy! ¡La papayeraaa!',
            '¿Y pa cuándo es eso?',
            '¡Revuelve eso!'
        ];


        setInterval(speakActitude, 45000);

        function speakActitude() {
            let index = getRandomArbitrary(0, actitude.length)
            const msg = new SpeechSynthesisUtterance();
            msg.text = actitude[index];
            msg.rate = 0.7;
            window.speechSynthesis.speak(msg);
        }

    }
)();
