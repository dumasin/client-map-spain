// ==========================================
// GROUP MANAGEMENT
// ==========================================

let expandedGroups = new Set();

function toggleGroup(groupId) {
    if (expandedGroups.has(groupId)) {
        expandedGroups.delete(groupId);
    } else {
        expandedGroups.add(groupId);
    }
    updateGroupsTree();
}

function selectGroup(groupId) {
    activeGroup = groupId;
    updateDisplay();
}

function editGroupName(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    const newName = prompt(`Rename "${group.name}":`, group.name);
    if (newName && newName.trim() && newName !== group.name) {
        group.name = newName.trim();
        saveGroupsToFirebase();
        updateGroupsTree();
        console.log(`✏️ Renamed group to "${group.name}"`);
    }
}

// F2: Get all client IDs including from child groups (hierarchical)
function getGroupAllClients(groupId) {
    const groupAndChildren = [groupId];
    
    function addChildrenRecursively(gId) {
        const group = groups.find(g => g.id === gId);
        if (group && group.children) {
            group.children.forEach(childId => {
                groupAndChildren.push(childId);
                addChildrenRecursively(childId);
            });
        }
    }
    
    addChildrenRecursively(groupId);
    return clients.filter(c => groupAndChildren.includes(c.groupId));
}

function updateGroupsTree() {
    let html = '';

    function renderGroup(group, level = 0) {
        const isExpanded = expandedGroups.has(group.id);
        const hasChildren = group.children.length > 0;
        const isActive = group.id === activeGroup;
        // F2: Count includes all child clients
        const totalClients = getGroupAllClients(group.id).length;
        const indent = level * 16;

        html += `
            <div class="group-node ${isActive ? 'active' : ''}" style="padding-left: ${indent}px;">
                <div class="group-toggle ${!hasChildren ? 'empty' : ''} ${!isExpanded ? 'collapsed' : ''}" onclick="event.stopPropagation(); toggleGroup('${group.id}')">
                    ${hasChildren ? '▼' : ''}
                </div>
                <div class="group-icon">${hasChildren ? '📁' : '📄'}</div>
                <div class="group-name" onclick="event.stopPropagation(); selectGroup('${group.id}')" ondblclick="event.stopPropagation(); editGroupName('${group.id}')">
                    ${group.name}
                </div>
                <div class="group-count">${totalClients}</div>
            </div>
        `;

        if (isExpanded && hasChildren) {
            group.children.forEach(childId => {
                const child = groups.find(g => g.id === childId);
                if (child) renderGroup(child, level + 1);
            });
        }
    }

    // Render root groups only
    groups.forEach(group => {
        if (!group.parent) {
            renderGroup(group);
        }
    });

    const groupsTree = document.getElementById('groupsTree');
    if (groupsTree) {
        groupsTree.innerHTML = html;
    }
}

function updateParentGroupSelect() {
    const parentGroupSelect = document.getElementById('parentGroupSelect');
    if (!parentGroupSelect) return;
    
    const options = ['<option value="">Root</option>'];
    groups.forEach(group => {
        options.push(`<option value="${group.id}">${group.name}</option>`);
    });
    parentGroupSelect.innerHTML = options.join('');
}

function createGroup() {
    const newGroupInput = document.getElementById('newGroupInput');
    const parentGroupSelect = document.getElementById('parentGroupSelect');
    const newGroupInputContainer = document.getElementById('newGroupInputContainer');
    
    const groupName = newGroupInput.value.trim();
    if (!groupName) return;

    const groupId = 'group_' + Date.now();
    const parentId = parentGroupSelect.value || null;

    const newGroup = {
        id: groupId,
        name: groupName,
        parent: parentId,
        children: []
    };

    groups.push(newGroup);

    // Add to parent's children if parent exists
    if (parentId) {
        const parent = groups.find(g => g.id === parentId);
        if (parent) {
            parent.children.push(groupId);
            expandedGroups.add(parentId);
        }
    }

    autoSaveToFirebase();
    updateDisplay();
    newGroupInput.value = '';
    newGroupInputContainer.style.display = 'none';
    updateParentGroupSelect();
}

function deleteGroup() {
    if (!activeGroup || activeGroup === 'general') {
        alert('Cannot delete the general group');
        return;
    }

    if (confirm(`Delete "${groups.find(g => g.id === activeGroup)?.name || 'Group'}" and move its clients?`)) {
        const groupToDelete = groups.find(g => g.id === activeGroup);
        const parentId = groupToDelete.parent || null;

        // Move all children to parent
        clients.forEach(client => {
            if (client.groupId === activeGroup) {
                client.groupId = parentId;
            }
        });

        groups = groups.filter(g => g.id !== activeGroup);

        if (parentId) {
            const parent = groups.find(g => g.id === parentId);
            if (parent) {
                parent.children = parent.children.filter(id => id !== activeGroup);
            }
        }

        activeGroup = parentId || 'general';
        autoSaveToFirebase();
        updateDisplay();
    }
}
