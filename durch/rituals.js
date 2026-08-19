(() => {
  "use strict";

  // Edit this list to update the Rituals of Durch section.
  const rituals = [
    ["The Davening", "A person accepts the possibility of Dave. Nothing visibly changes."],
    ["The Great Reboot", "Everyone turns it off, waits a respectful interval, and hopes it comes back on."],
    ["Laying On of Googly Eyes", "Applied only to consenting objects that would benefit from witness."],
    ["Ritual Taco Consumption", "Any suitable food may stand in for the taco. The napkin is canonical."],
    ["The Ceremonial Ping", "One Dave calls; another responds. Latency is not a moral failing."],
    ["Installing Mind Antivirus", "Removes dangerous certainty while preserving working skepticism."],
    ["The Exchange of Stickers", "A solemn transfer of adhesive authority between willing surfaces."],
    ["Daveputization", "Point gently, announce “You’ll do,” and respect the answer."],
    ["Annual Questioning of Dave", "Ask what Dave has done for us. Accept no single answer."],
    ["The Sacred Beverage", "Alcoholic or non-alcoholic by equal canon. Hydration outranks tradition."],
    ["Blessing of the Hardware", "Place one hand near—but not necessarily upon—the device and declare, “Probably works.” Power may then be applied. Any released magic smoke constitutes a response from Dave."],
    ["Confession of Technical Debt", "A Dave admits something they did “temporarily” several years ago. The congregation responds, “We have all hard-coded localhost.” No remediation is required during the ceremony."],
    ["Naming of the Unknown Cable", "An unidentified cable is held aloft and the congregation is asked whether anyone knows what it belongs to. Regardless of the answer, the cable is returned to storage because “we might need it.”"],
    ["Sacred Exchange of Knowledge", "One Dave shows another Dave how to do something they could have Googled. The recipient must subsequently teach it to someone else, preferably with minor inaccuracies."],
    ["Laying On of the Adapter", "When a Dave lacks the correct connector, the congregation produces increasingly improbable dongles until interoperability is achieved. The final adapter is declared a relic."],
    ["Rite of Unnecessary Improvement", "Find something that works perfectly well. Add LEDs, networking, a microcontroller, or a web interface. When asked why, answer: “It seemed like it should have one.”"],
    ["Canonization of the Bit", "A sufficiently funny accident, typo, misunderstanding, or drunken remark is repeated three times. It is thereafter considered intentional and may be incorporated into official DaveCon doctrine."],
    ["The Closing of the Con", "At the end of DaveCon, during the Post-Party Depression, the faithful declare that next year will be better organized. Everyone solemnly agrees. No action items are recorded."]
  ];

  const grid = document.getElementById("ritual-grid");
  rituals.forEach(([title, description], index) => {
    const article = document.createElement("article");
    const number = document.createElement("span");
    number.textContent = `⌁ ${String(index + 1).padStart(2, "0")}`;
    const heading = document.createElement("h3");
    heading.textContent = title;
    const copy = document.createElement("p");
    copy.textContent = description;
    article.append(number, heading, copy);
    grid.append(article);
  });
})();
