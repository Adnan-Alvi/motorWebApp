// Connect to the ROS2 WebSocket server
var ros = new ROSLIB.Ros({
    url: 'ws://<your-ros2-ip>:9090'  // Replace with the IP address of your ROS2 system
});

// Create ROS topics for forward and reverse direction
var forwardDirection = new ROSLIB.Topic({
    ros: ros,
    name: '/forward_direction',
    messageType: 'std_msgs/Bool'
});

var reverseDirection = new ROSLIB.Topic({
    ros: ros,
    name: '/reverse_direction',
    messageType: 'std_msgs/Bool'
});

// Function to handle publishing bool messages to a given topic
function publishMessage(topic, value) {
    var msg = new ROSLIB.Message({
        data: value
    });
    topic.publish(msg);
}

// Handle Start button press and release events
document.getElementById('start-button').addEventListener('mousedown', function() {
    publishMessage(forwardDirection, true);
});
document.getElementById('start-button').addEventListener('mouseup', function() {
    publishMessage(forwardDirection, false);
});

// Handle Stop button press and release events
document.getElementById('stop-button').addEventListener('mousedown', function() {
    publishMessage(reverseDirection, true);
});
document.getElementById('stop-button').addEventListener('mouseup', function() {
    publishMessage(reverseDirection, false);
});
