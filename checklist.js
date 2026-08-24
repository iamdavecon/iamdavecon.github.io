(() => {
  const STORAGE_KEY = "davecon-checklist-v1";
  const categories = [
    ["Dave Encounters", "Meet someone actually named Dave.", "Daveputize someone you did not know before DEF CON.", "Give someone a DaveCon badge.", "Explain DaveCon to a confused stranger.", "Hear someone ask, \"Is your name really Dave?\"", "Meet someone who remembers a previous DaveCon.", "Meet someone attending their first DEF CON.", "Talk to someone from another country.", "Get a stranger to tell you their first DEF CON story.", "Have someone voluntarily say \"Praise Dave.\""],
    ["Pilgrimage & Provisions", "Visit Slots-A-Fun.", "Consume a $2 hot dog.", "Acquire a suspiciously inexpensive beer.", "Deliver salt to someone who appears salty.", "Eat a taco.", "Hydrate like a responsible Dave.", "Visit somewhere you only found because another person told you about it.", "Take a photo at an unofficial DaveCon holy site."],
    ["Hacker Wildlife", "Spot a ridiculous SAO.", "See someone actively soldering.", "Find a questionable solder joint.", "Find something running Linux.", "Find someone using vi.", "Spot a FreeBSD daemon.", "Find someone still using IRC.", "See a device whose purpose is not immediately obvious.", "See googly eyes attached to technology.", "Spot an ouroboros.", "Spot a ☯ symbol in DaveCon context."],
    ["DEF CON Encounters", "Talk to a DEF CON goon.", "Acquire unexplained swag.", "Trade one piece of swag for another.", "Hear someone mention LineCon.", "Spot someone carrying more than three SAOs.", "Find a badge from a previous DEF CON.", "Encounter something that looks extremely expensive and homemade at the same time.", "Hear the phrase \"remember when...\"", "Witness an interaction that would be difficult to explain outside DEF CON."],
    ["Dave Trials", "Learn someone's hacker handle.", "Help someone solve a small problem.", "Make someone laugh with a bad joke.", "Tell a Dave-themed dad joke.", "Acquire something you cannot explain.", "Discover a piece of DaveCon lore you did not previously know.", "Introduce two people who did not know each other.", "Leave somewhere with more stickers than you arrived with.", "Do something that becomes a \"remember when...\" story.", "Complete one checklist item entirely by accident."]
  ].map(([name, ...tasks]) => ({ name, tasks }));
  const allTasks = [{ id: "free-dave", text: "FREE DAVE — You made it to DaveCon. That already counts for something.", category: "Free Space", free: true }];
  categories.forEach(category => category.tasks.forEach((text, index) => allTasks.push({ id: `${category.name}-${index}`, text, category: category.name })));
  let completed = loadState();
  const list = document.querySelector("#checklist");
  const categoryFilter = document.querySelector("#category-filter");
  categories.forEach(({ name }) => categoryFilter.insertAdjacentHTML("beforeend", `<option value="${name}">${name}</option>`));

  function loadState() { try { return new Set(["free-dave", ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")]); } catch { return new Set(["free-dave"]); } }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed].filter(id => id !== "free-dave"))); }
  function rankFor(percent) { if (percent === 100) return "DOPE"; if (percent >= 75) return "ASCENDED"; if (percent >= 50) return "DAVESCIPLE"; if (percent >= 25) return "DAVEPUTIZED"; if (percent >= 10) return "DAVE-CURIOUS"; return "UNSTABLE"; }
  function render() {
    const onlyIncomplete = document.querySelector("#incomplete-only").checked;
    const chosenCategory = categoryFilter.value;
    list.innerHTML = "";
    const visible = allTasks.filter(task => (chosenCategory === "all" || task.category === chosenCategory) && (!onlyIncomplete || !completed.has(task.id)));
    categories.forEach(category => {
      const tasks = visible.filter(task => task.category === category.name);
      if (!tasks.length) return;
      const section = document.createElement("section"); section.className = "category"; section.setAttribute("aria-labelledby", `heading-${category.name}`);
      section.innerHTML = `<div class="category-heading"><h2 id="heading-${category.name}">${category.name}</h2><span class="category-count">${category.tasks.filter((_, index) => completed.has(`${category.name}-${index}`)).length}/${category.tasks.length} complete</span></div><div class="task-list"></div>`;
      const taskList = section.querySelector(".task-list"); tasks.forEach(task => taskList.appendChild(taskElement(task))); list.appendChild(section);
    });
    const free = allTasks[0]; if ((chosenCategory === "all" || chosenCategory === "Free Space") && (!onlyIncomplete || completed.has(free.id))) { const section = document.createElement("section"); section.className = "category"; section.innerHTML = `<div class="category-heading"><h2>Free Space</h2><span class="category-count">Permanent</span></div><div class="task-list"></div>`; section.querySelector(".task-list").appendChild(taskElement(free)); list.appendChild(section); }
    updateProgress();
  }
  function taskElement(task) { const label = document.createElement("label"); label.className = `task${completed.has(task.id) ? " completed" : ""}${task.free ? " free" : ""}`; label.innerHTML = `<input type="checkbox" ${completed.has(task.id) ? "checked" : ""} ${task.free ? "disabled" : "aria-label=\"Mark task complete\""}><span class="task-text">${task.text}</span>`; if (!task.free) label.querySelector("input").addEventListener("change", () => { completed.has(task.id) ? completed.delete(task.id) : completed.add(task.id); saveState(); render(); }); return label; }
  function updateProgress() { const total = allTasks.length, count = completed.size, percent = Math.round((count / total) * 100), rank = rankFor(percent); document.querySelector("#completed-count").textContent = count; document.querySelector("#total-count").textContent = total; document.querySelector("#percentage").textContent = `${percent}%`; document.querySelector("#rank").textContent = rank; document.querySelector("#progress-fill").style.width = `${percent}%`; const bar = document.querySelector(".progress-track"); bar.setAttribute("aria-valuenow", percent); document.querySelector("#status-message").textContent = percent === 100 ? "The bureaucracy has reached its final form." : `${rank === "UNSTABLE" ? "The paperwork has begun." : "Rank escalation detected."} This is already more official than expected.`; document.querySelector("#complete-message").hidden = percent !== 100; }
  document.querySelector("#mission-button").addEventListener("click", () => { const options = allTasks.filter(task => !task.free && !completed.has(task.id)); const task = options[Math.floor(Math.random() * options.length)]; document.querySelector("#mission-text").textContent = task ? `MISSION: ${task.text}` : "No incomplete missions remain. You are either DOPE or dangerously thorough."; });
  document.querySelector("#reset-button").addEventListener("click", () => { if (confirm("Reset all DaveCon progress on this device? FREE DAVE will remain completed.")) { completed = new Set(["free-dave"]); saveState(); render(); document.querySelector("#mission-text").textContent = "Progress reset. The field has chosen nothing for you."; } });
  document.querySelector("#share-button").addEventListener("click", async () => { const text = `DaveCon Checklist: ${completed.size}/${allTasks.length} complete — Rank: ${rankFor(Math.round((completed.size / allTasks.length) * 100))}`; try { await navigator.clipboard.writeText(text); document.querySelector("#share-button").textContent = "Copied to Clipboard"; setTimeout(() => document.querySelector("#share-button").textContent = "Copy Progress Summary", 1800); } catch { prompt("Copy your DaveCon progress summary:", text); } });
  document.querySelector("#incomplete-only").addEventListener("change", render); categoryFilter.addEventListener("change", render); render();
})();
