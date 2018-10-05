var gn = new GyroNorm();
let songControl;

function preload() {
    song = loadSound("./assets/song.mp3")

    gn.init({}).then(function () {
        gn.start(function (data) {
            // console.log(data.do.alpha);
            // Process:
            // data.do.alpha	( deviceorientation event alpha value )
            // data.do.beta		( deviceorientation event beta value )
            // data.do.gamma	( deviceorientation event gamma value )
            // data.do.absolute	( deviceorientation event absolute value )

            // data.dm.x		( devicemotion event acceleration x value )
            // data.dm.y		( devicemotion event acceleration y value )
            // data.dm.z		( devicemotion event acceleration z value )

            // data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
            // data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
            // data.dm.gz		( devicemotion event accelerationIncludingGravity z value )

            // data.dm.alpha	( devicemotion event rotationRate alpha value )
            // data.dm.beta		( devicemotion event rotationRate beta value )
            // data.dm.gamma	( devicemotion event rotationRate gamma value )
        });
    }).catch(function (e) {
        // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
    });

}

function setup() {
    rateSlider = createSlider(0,2,1,0.01)
    songControl = createButton("Play/Pause Song")
    createCanvas(windowWidth, windowHeight, WEBGL)
    song.play();
    amp = new p5.Amplitude(0.1);
    // cam = createCapture(VIDEO)

}

function draw() {
    // background(255,255,0)
    background(0)

    song.rate(rateSlider.value())

    songControl.mousePressed(() => {
        if(song.isPlaying()){
            song.pause();
        }else{
            song.play();
        }
    } )
    
    let level = amp.getLevel();
    let levelSize = level * 400;

    let camMax = 400;
    
    let x = map(mouseX, 0, width, -camMax, camMax)
    let y = map(mouseY, 0, width, -camMax, camMax)
    // let x = frameCount * 1
    camera(0, 0, (height / 2) / tan(PI / 6), -x, -y, 0, 0, 1, 0)
    perspective(5)

    // pointLight(255,255,255,0,50,50)
    
    specularMaterial(255,255,255,255)
    
    noStroke();

    rotateX(frameCount * 0.05)
    rotateY(frameCount * 0.005)

    // fill(255)
    normalMaterial()
    let startingSphere = 0
    let sphereSize =levelSize;
    for (var i = 0; i < 4; i++) {

        levelSize = levelSize - 100;
        sphereSize = sphereSize + 50;
        // texture(cam)
        
        push()
        startingSphere = startingSphere - 100
        translate(startingSphere, 0)
        sphere(sphereSize / 3)
        pop()

        push()
        startingSphere = startingSphere - 100
        translate(-startingSphere, 0)
        sphere(sphereSize / 3)
        pop()
    }
}