let ros = null;  // Declare the ROS connection as a global variable
let forwardDirection = null;
let reverseDirection = null;

// Function to establish WebSocket connection based on user input
function connectToROS(ipAddress) {
    console.log(`Attempting to connect to ROS2 server at ws://${ipAddress}:9090`);
    
    ros = new ROSLIB.Ros({
        url: `wss://${ipAddress}:9090`
    });

    // Create ROS topics for forward and reverse direction
    forwardDirection = new ROSLIB.Topic({
        ros: ros,
        name: '/forward_direction',
        messageType: 'std_msgs/Bool'
    });

    reverseDirection = new ROSLIB.Topic({
        ros: ros,
        name: '/reverse_direction',
        messageType: 'std_msgs/Bool'
    });

    // Enable buttons after connection is established
    ros.on('connection', function() {
        console.log('Connected to ROS2 server.');
        document.getElementById('start-button').disabled = false;
        document.getElementById('stop-button').disabled = false;
        alert('Connected successfully!'); // Optional alert for confirmation
    });

    ros.on('error', function(error) {
        console.error('Error connecting to ROS2:', error);
        alert('Failed to connect to ROS2. Check the IP address and try again.');
    });

    ros.on('close', function() {
        console.log('Connection to ROS2 closed.');
        document.getElementById('start-button').disabled = true;
        document.getElementById('stop-button').disabled = true;
    });
}

// Function to handle publishing bool messages to a given topic
function publishMessage(topic, value) {
    if (!topic) {
        console.error('Topic is not defined.');
        return;
    }

    var msg = new ROSLIB.Message({
        data: value
    });
    console.log(`Publishing ${value} to ${topic.name}`);
    topic.publish(msg);
}

// Handle Start button press and release events
document.getElementById('start-button').addEventListener('mousedown', function() {
    console.log('Start button pressed.');
    publishMessage(forwardDirection, true);
});
document.getElementById('start-button').addEventListener('mouseup', function() {
    console.log('Start button released.');
    publishMessage(forwardDirection, false);
});

// Handle Stop button press and release events
document.getElementById('stop-button').addEventListener('mousedown', function() {
    console.log('Stop button pressed.');
    publishMessage(reverseDirection, true);
});
document.getElementById('stop-button').addEventListener('mouseup', function() {
    console.log('Stop button released.');
    publishMessage(reverseDirection, false);
});

// Connect button event listener
document.getElementById('connect-button').addEventListener('click', function() {
    const ipAddress = document.getElementById('ip-input').value.trim();
    if (ipAddress) {
        console.log(`Connecting to IP address: ${ipAddress}`);
        connectToROS(ipAddress);
    } else {
        alert('Please enter a valid IP address.');
    }
});
