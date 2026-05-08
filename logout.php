<?php
// Clear session
session_start();
session_destroy();

// Clear localStorage data by redirecting to a clearing page
// Then redirect to login
?>
<!DOCTYPE html>
<html>
<head>
    <title>Logging out...</title>
    <script>
        // Clear localStorage
        localStorage.removeItem('userData');
        sessionStorage.removeItem('userData');
        
        // Redirect to login after 1 second
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 1000);
    </script>
</head>
<body>
    <p>Logging out...</p>
</body>
</html>