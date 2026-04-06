// ==========================================
// SERVICE CONTRACTS (F3)
// ==========================================

// Helper function for service status
function getServiceStatus(service) {
    if (!service.active || !service.expiryDate) {
        return { status: 'inactive', daysLeft: null, display: 'No contract' };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(service.expiryDate);
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
        return { status: 'expired', daysLeft: 0, display: '❌ Expired' };
    } else if (daysLeft === 0) {
        return { status: 'expiring', daysLeft: 0, display: '⚠️ Expires today' };
    } else if (daysLeft <= 30) {
        return { status: 'warning', daysLeft, display: `⚠️ ${daysLeft}d left` };
    } else {
        return { status: 'active', daysLeft, display: `✅ ${daysLeft}d left` };
    }
}

// Edit service contract
function editService(clientId, serviceType) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const service = client.services[serviceType];
    const currentDate = service.expiryDate || new Date().toISOString().split('T')[0];
    
    const newActive = confirm(`Enable "${serviceType}" for ${client.name}?\n\n(Click OK for Yes, Cancel for No)`);
    
    if (newActive) {
        // Prompt for expiry date
        const expiryDateStr = prompt(`Enter expiry date for ${serviceType}:\n(Format: YYYY-MM-DD)\n\nExample: 2026-12-31`, currentDate.split('T')[0]);
        
        if (expiryDateStr) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (dateRegex.test(expiryDateStr)) {
                service.active = true;
                service.expiryDate = expiryDateStr;
                console.log(`✅ ${serviceType} activated for ${client.name} until ${expiryDateStr}`);
            } else {
                alert('Invalid date format. Use YYYY-MM-DD');
                return;
            }
        }
    } else {
        service.active = false;
        service.expiryDate = null;
        console.log(`❌ ${serviceType} deactivated for ${client.name}`);
    }
    
    autoSaveToFirebase();
    updateClientsList();
}
