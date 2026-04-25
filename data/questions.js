"use client";

import React, { useState } from 'react';
import { BookOpen, Trophy, Clock, ArrowRight, Linkedin, Github, Code, CheckCircle, XCircle, RotateCcw, ChevronLeft, Menu, X } from 'lucide-react';

// ==========================================
// UTILS / LOGIC
// ==========================================

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const selectRandomQuestions = (questions, count) => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
};

const shuffleOptions = (question) => {
  const optionsWithIndex = question.options.map((opt, idx) => ({ 
    text: opt, 
    originalIndex: idx 
  }));
  const shuffled = shuffleArray(optionsWithIndex);
  return {
    ...question,
    shuffledOptions: shuffled.map(o => o.text),
    correctAnswerIndex: shuffled.findIndex(o => o.originalIndex === question.correctAnswer)
  };
};

const calculateResults = (questions, answers) => {
  let correct = 0;
  const details = questions.map(q => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswerIndex;
    if (isCorrect) correct++;
    return {
      questionId: q.id,
      week: q.week,
      assignment: q.assignment,
      question: q.question,
      userAnswer: userAnswer !== undefined ? q.shuffledOptions[userAnswer] : 'Not answered',
      correctAnswer: q.shuffledOptions[q.correctAnswerIndex],
      isCorrect,
      answered: userAnswer !== undefined
    };
  });
  const total = questions.length;
  const incorrect = total - correct;
  const percentage = ((correct / total) * 100).toFixed(1);
  return {
    correct,
    incorrect,
    total,
    percentage,
    passed: percentage >= 50,
    details
  };
};

const validateName = (name) => {
  const trimmedName = name.trim();
  if (trimmedName.length < 2) return { isValid: false, error: 'Please enter your name (at least 2 characters)' };
  if (trimmedName.length > 50) return { isValid: false, error: 'Name is too long (maximum 50 characters)' };
  return { isValid: true, error: null };
};

// ==========================================
// DATA: QUESTIONS
// ==========================================

export const ecologyQuestions = [
  // Week 0
  { id: 1, week: 0, assignment: 0, question: "Transplantation experiments are used to find", options: ["potential range", "effective range", "actual range", "economic range"], correctAnswer: 0 },
  { id: 2, week: 0, assignment: 0, question: "Which of these is not a characteristic of fitness?", options: ["Fitness is environment-specific.", "Fitness is species-specific.", "Higher reproductive rate means higher fitness.", "Fitness should be measured across several generations."], correctAnswer: 2 },
  { id: 3, week: 0, assignment: 0, question: "The hierarchical system was given by", options: ["Simon", "Watson", "Hutchinson", "Humboldt"], correctAnswer: 0 },
  { id: 4, week: 0, assignment: 0, question: "Hamilton's rule can be stated as", options: ["rB < C", "rB > C", "rB = C", "rB + C = 0"], correctAnswer: 1 },
  { id: 5, week: 0, assignment: 0, question: "Consider the food chain: Grass → Grasshopper → Frog → Snake → Hawk. As we move up the food chain,", options: ["available energy decreases", "available energy increases", "available energy remains same", "available energy is zero everywhere"], correctAnswer: 0 },
  { id: 6, week: 0, assignment: 0, question: "The logistic growth equation, when plotted, appears", options: ["I shaped", "J shaped", "S shaped", "O shaped"], correctAnswer: 2 },
  { id: 7, week: 0, assignment: 0, question: "The climax near Tindni village is being controlled by disturbance by cattle. This is an example of", options: ["climatic climax", "edaphic climax", "disclimax", "catastrophic climax"], correctAnswer: 2 },
  { id: 8, week: 0, assignment: 0, question: "\"Quick movement over large distances, often across unsuitable terrain\" is a description of", options: ["diffusion", "secular dispersal", "jump dispersal", "drifting"], correctAnswer: 2 },
  { id: 9, week: 0, assignment: 0, question: "Captive breeding is an example of", options: ["in-situ conservation", "ex-situ conservation", "in-situ preservation", "ex-situ preservation"], correctAnswer: 1 },
  { id: 10, week: 0, assignment: 0, question: "The demographic transition sees a society move from", options: ["high birth rate, low death rate to low birth rate, low death rate", "low birth rate, high death rate to low birth rate, low death rate", "high birth rate, high death rate to low birth rate, low death rate", "high birth rate, high death rate to low birth rate, high death rate"], correctAnswer: 2 },
  // Week 1
  { id: 11, week: 1, assignment: 1, question: "Which of these is not a characteristic of fitness?", options: ["Fitness is environment-specific.", "Fitness is species-specific.", "Higher reproductive rate means higher fitness.", "Fitness should be measured across several generations."], correctAnswer: 2 },
  { id: 12, week: 1, assignment: 1, question: "Who amongst these is considered the father of Biogeography?", options: ["Theophrastus", "Linnaeus", "Malthus", "Humboldt"], correctAnswer: 3 },
  { id: 13, week: 1, assignment: 1, question: "In the Greek word root of Ecology, Oikos refers to", options: ["household", "preservation", "environment", "study"], correctAnswer: 0 },
  { id: 14, week: 1, assignment: 1, question: "In the Greek word root of Ecology, logos refers to", options: ["household", "preservation", "environment", "study"], correctAnswer: 3 },
  { id: 15, week: 1, assignment: 1, question: "Which of these is not a step in natural selection?", options: ["variation", "underpopulation", "struggle for existence", "survival of the fittest"], correctAnswer: 1 },
  { id: 16, week: 1, assignment: 1, question: "Ecology is the scientific study of _____ that determine the distribution and abundance of organisms.", options: ["statics", "interactions", "dynamics", "habitat"], correctAnswer: 1 },
  { id: 17, week: 1, assignment: 1, question: "Which of these is not a characteristic of fitness?", options: ["Fitness is environment-specific.", "Fitness is species-specific.", "Fitness works on traits such as size and speed.", "Fitness should be measured across several generations."], correctAnswer: 2 },
  { id: 18, week: 1, assignment: 1, question: "Ecology is the scientific study of interactions among organisms and their _____.", options: ["habitat", "niche", "environment", "population"], correctAnswer: 2 },
  { id: 19, week: 1, assignment: 1, question: "\"Enquiry into plants\" is a book written by", options: ["Theophrastus", "Linnaeus", "Malthus", "Humboldt"], correctAnswer: 0 },
  { id: 20, week: 1, assignment: 1, question: "Which of these is not a kind of selection?", options: ["directional", "stochastic", "disruptive", "stabilising"], correctAnswer: 1 },
  // Week 2
  { id: 21, week: 2, assignment: 2, question: "Hierarchy emerges almost inevitably through a wide variety of evolutionary processes, for the simple reason that hierarchical structures are...........", options: ["perfect", "imperfect", "stable", "unstable"], correctAnswer: 2 },
  { id: 22, week: 2, assignment: 2, question: "The hierarchical system was given by", options: ["Simon", "Watson", "Hutchinson", "Humboldt"], correctAnswer: 0 },
  { id: 23, week: 2, assignment: 2, question: "The emergent principle can be stated as", options: ["Whole = sum of parts", "Whole < sum of parts", "Whole > sum of parts", "None of these"], correctAnswer: 2 },
  { id: 24, week: 2, assignment: 2, question: "\"the diversity that exists within an ecosystem\" is", options: ["alpha (α) biodiversity", "beta (β) biodiversity", "gamma (γ) biodiversity", "delta (δ) biodiversity"], correctAnswer: 0 },
  { id: 25, week: 2, assignment: 2, question: "The mitochondrion is a / an", options: ["Sub-cellular organelle", "Cell", "Tissue", "Organ"], correctAnswer: 0 },
  { id: 26, week: 2, assignment: 2, question: "For more biodiversity, the level of disturbance should be", options: ["less", "intermediate", "more", "none of these"], correctAnswer: 1 },
  { id: 27, week: 2, assignment: 2, question: "There is more biodiversity in areas with", options: ["less competition, less predation", "less competition, more predation", "more competition, more predation", "more competition, less predation"], correctAnswer: 2 },
  { id: 28, week: 2, assignment: 2, question: "\"the diversity that exists among different geographies\" is", options: ["alpha (α) biodiversity", "beta (β) biodiversity", "gamma (γ) biodiversity", "delta (δ) biodiversity"], correctAnswer: 2 },
  { id: 29, week: 2, assignment: 2, question: "The laboratory approach to Ecology uses", options: ["equations", "models", "observations", "experiments"], correctAnswer: 3 },
  { id: 30, week: 2, assignment: 2, question: "\"groups of actually or potentially interbreeding natural populations, which are reproductively isolated from other such groups\" is a definition of", options: ["cells", "species", "ecosystems", "biomes"], correctAnswer: 1 },
  // Week 3
  { id: 31, week: 3, assignment: 3, question: "I observe a monkey take a tick out of another monkey's head and eat it. In the social context, this behaviour would be called", options: ["tick hunting", "auto grooming", "allo grooming", "foraging"], correctAnswer: 2 },
  { id: 32, week: 3, assignment: 3, question: "The scientific study of animal behaviour is called", options: ["behaviourism", "ecology", "ethology", "prey-predator dynamics"], correctAnswer: 2 },
  { id: 33, week: 3, assignment: 3, question: "Hamilton's rule can be stated as", options: ["rB < C", "rB > C", "rB = C", "rB + C = 0"], correctAnswer: 1 },
  { id: 34, week: 3, assignment: 3, question: "Harmonious interactions occur where", options: ["at least one participant is benefited", "at least one participant is unharmed", "both participants are benefitted", "both participants are unharmed"], correctAnswer: 3 },
  { id: 35, week: 3, assignment: 3, question: "The interaction between exotic shrubs and trees through the action of seed predators is an example of", options: ["infraspecific competition", "apparent competition", "disguised competition", "harmonious competition"], correctAnswer: 1 },
  { id: 36, week: 3, assignment: 3, question: "An inventory of behaviours exhibited by an animal during a behaviour exercise is called", options: ["ecogram", "ethogram", "behaviourogram", "animalogram"], correctAnswer: 1 },
  { id: 37, week: 3, assignment: 3, question: "Trampling of grass due to the movement of animals is an example of", options: ["mutualism", "amensalism", "commensalism", "protocooperation"], correctAnswer: 1 },
  { id: 38, week: 3, assignment: 3, question: "I observe a bird take a tick out of another bird's head and eat it. In the social context, this behaviour would be called", options: ["tick hunting", "auto grooming", "allo grooming", "foraging"], correctAnswer: 2 },
  { id: 39, week: 3, assignment: 3, question: "Birds on giraffe are an example of", options: ["colony", "commensalism", "protocooperation", "allelopathy"], correctAnswer: 2 },
  { id: 40, week: 3, assignment: 3, question: "Egrets with buffaloes are an example of", options: ["colony", "commensalism", "protocooperation", "allelopathy"], correctAnswer: 1 },
  // Week 4
  { id: 41, week: 4, assignment: 4, question: "If we all became vegetarians, we'll be able to support our large populations. This can be explained through", options: ["10% rule", "1% rule", "trophic cascade", "biodiversity"], correctAnswer: 0 },
  { id: 42, week: 4, assignment: 4, question: "Net primary productivity is given by", options: ["APAR × LUE", "APAR + LUE", "APAR - LUE", "APAR / LUE"], correctAnswer: 0 },
  { id: 43, week: 4, assignment: 4, question: "Trees → Birds → Parasites → Hyperparasites represents", options: ["upright pyramid of numbers", "inverted pyramid of numbers", "spindle pyramid of numbers", "dumb-bell pyramid of numbers"], correctAnswer: 1 },
  { id: 44, week: 4, assignment: 4, question: "Consider the food chain: Grass → Grasshopper → Frog → Snake → Hawk. As we move up the food chain,", options: ["available energy decreases", "available energy increases", "available energy remains same", "available energy is zero everywhere"], correctAnswer: 0 },
  { id: 45, week: 4, assignment: 4, question: "Consider the food chain: Grass → Grasshopper → Frog → Snake → Hawk. In this food chain,", options: ["frog is producer", "frog is consumer and carnivore", "frog is consumer and herbivore", "frog is decomposer"], correctAnswer: 1 },
  { id: 46, week: 4, assignment: 4, question: "Consider the food chain: Grass → Grasshopper → Frog → Snake → Hawk. In this food chain,", options: ["more number of hawks than grasshoppers can be supported", "more number of grasshoppers than hawks can be supported", "equal number of hawks and grasshoppers can be supported", "none of these"], correctAnswer: 1 },
  { id: 47, week: 4, assignment: 4, question: "At the compensation point,", options: ["photosynthesis = respiration", "photosynthesis < respiration", "photosynthesis > respiration", "photosynthesis = 0"], correctAnswer: 0 },
  { id: 48, week: 4, assignment: 4, question: "Glacial lakes are typical examples of", options: ["eutrophic lakes", "hypereutrophic lakes", "oligotrophic lakes", "mesotrophic lakes"], correctAnswer: 2 },
  { id: 49, week: 4, assignment: 4, question: "Consider the food chain: Grass → Grasshopper → Frog → Snake → Hawk. In this food chain,", options: ["hawk is producer", "hawk is consumer and carnivore", "hawk is consumer and herbivore", "hawk is decomposer"], correctAnswer: 1 },
  { id: 50, week: 4, assignment: 4, question: "Tree → Frugivorous birds → Hawk represents", options: ["upright pyramid of numbers", "inverted pyramid of numbers", "spindle pyramid of numbers", "dumb-bell pyramid of numbers"], correctAnswer: 2 },
  // Week 5
  { id: 51, week: 5, assignment: 5, question: "Which of these is true?", options: ["Physiological longevity > Ecological longevity", "Physiological longevity = Ecological longevity", "Physiological longevity < Ecological longevity", "a or b"], correctAnswer: 3 },
  { id: 52, week: 5, assignment: 5, question: "A sampling procedure such that each possible combination of sampling units out of the population has the same chance of being selected is referred to as", options: ["Simple random sampling", "Systematic sampling", "Stratified sampling", "Multistage sampling"], correctAnswer: 0 },
  { id: 53, week: 5, assignment: 5, question: "Cover board surveys are typically used for sampling", options: ["herpetofauna", "fishes", "large mammals", "carnivores"], correctAnswer: 0 },
  { id: 54, week: 5, assignment: 5, question: "_________ is how close the measured values are to the correct value.", options: ["Accuracy", "Precision", "Bias", "Variance"], correctAnswer: 0 },
  { id: 55, week: 5, assignment: 5, question: "The logistic growth equation, when plotted, appears", options: ["I shaped", "J shaped", "S shaped", "O shaped"], correctAnswer: 2 },
  { id: 56, week: 5, assignment: 5, question: "The minimum replacement level fertility for a population to grow should be greater than", options: ["1", "2", "3", "4"], correctAnswer: 1 },
  { id: 57, week: 5, assignment: 5, question: "The juvenile mortality rate is the annual number of deaths of juveniles per", options: ["100 births", "1000 births", "100 live births", "1000 live births"], correctAnswer: 3 },
  { id: 58, week: 5, assignment: 5, question: "_______ employs a simple rule of selecting every kth unit starting with a number chosen at random from 1 to k as the random start.", options: ["Simple random sampling", "Systematic sampling", "Stratified sampling", "Multistage sampling"], correctAnswer: 1 },
  { id: 59, week: 5, assignment: 5, question: "Pan traps are used for sampling", options: ["bees", "butterflies", "non-pollinator insects", "pollinator insects"], correctAnswer: 3 },
  { id: 60, week: 5, assignment: 5, question: "Which of these is not a measure of absolute population density?", options: ["total count", "pelt count", "capture-recapture method", "removal method"], correctAnswer: 1 },
  // Week 6
  { id: 61, week: 6, assignment: 6, question: "Which of these is correct?", options: ["Fundamental niche > Realised niche", "Fundamental niche = Realised niche", "Fundamental niche < Realised niche", "a or b"], correctAnswer: 3 },
  { id: 62, week: 6, assignment: 6, question: "Which of these is not a characteristic of pioneer species", options: ["ability to grow on bare rocks", "ability to tolerate extreme temperatures", "large size", "short life span"], correctAnswer: 2 },
  { id: 63, week: 6, assignment: 6, question: "A climax caused by wildfires is an example of", options: ["climatic climax", "edaphic climax", "disclimax", "catastrophic climax"], correctAnswer: 3 },
  { id: 64, week: 6, assignment: 6, question: "Importance value varies from", options: ["0 to 10", "0 to 50", "0 to 100", "0 to 300"], correctAnswer: 3 },
  { id: 65, week: 6, assignment: 6, question: "When compared to generalist species, specialist species have", options: ["narrower niches", "broader niches", "same-size niches", "none of these"], correctAnswer: 0 },
  { id: 66, week: 6, assignment: 6, question: "The climax near Tindni village is being controlled by disturbance by cattle. This is an example of", options: ["climatic climax", "edaphic climax", "disclimax", "catastrophic climax"], correctAnswer: 2 },
  { id: 67, week: 6, assignment: 6, question: "Lithosere is an example of", options: ["hydrosere", "xerosere", "psammosere", "halosere"], correctAnswer: 1 },
  { id: 68, week: 6, assignment: 6, question: "A species found most frequently in a particular community, but also present occasionally in others is called", options: ["accidental species", "indifferent species", "selective species", "exclusive species"], correctAnswer: 2 },
  { id: 69, week: 6, assignment: 6, question: "Which of these depicts correctly the lithosere primary succession?", options: ["Rock → Crustose lichen → Foliose lichen → Moss → Herbaceous stage → Shrub → Woodland → Climax", "Rock → Foliose lichen → Crustose lichen → Moss → Herbaceous stage → Shrub → Woodland → Climax", "Moss → Crustose lichen → Foliose lichen → Rock → Herbaceous stage → Shrub → Woodland → Climax", "Rock → Crustose lichen → Foliose lichen → shrub → Herbaceous stage → Moss → woodland → climax"], correctAnswer: 0 },
  { id: 70, week: 6, assignment: 6, question: "Importance value can be written as", options: ["Relative density + Relative frequency X Relative dominance", "Relative density X Relative frequency + Relative dominance", "Relative density + Relative frequency + Relative dominance", "Relative density X Relative frequency X Relative dominance"], correctAnswer: 2 },
  // Week 7
  { id: 71, week: 7, assignment: 7, question: "Which of these is not a physical factor of habitat?", options: ["soil", "moisture", "predators", "temperature"], correctAnswer: 2 },
  { id: 72, week: 7, assignment: 7, question: "The movement of individuals away from their place of birth or hatching or seed production into a new habitat or area to survive and reproduce is called", options: ["translocation", "migration", "dispersal", "drifting"], correctAnswer: 2 },
  { id: 73, week: 7, assignment: 7, question: "The movement of lions across the Gir landscape is an example of", options: ["diffusion", "secular dispersal", "jump dispersal", "drifting"], correctAnswer: 0 },
  { id: 74, week: 7, assignment: 7, question: "I tried growing vegetables under my teak plantation, but the vegetable plants died out. I should be concerned about", options: ["autophagy", "allelophagy", "autopathy", "allelopathy"], correctAnswer: 3 },
  { id: 75, week: 7, assignment: 7, question: "The regular, seasonal movement of animals, often along fixed routes is called", options: ["translocation", "migration", "dispersal", "drifting"], correctAnswer: 1 },
  { id: 76, week: 7, assignment: 7, question: "\"The rate of any biological process is limited by that factor in least amount relative to requirement, so there is a single limiting factor.\" This is the statement for", options: ["Liebig's law of the minimum", "Liebig's law of the maximum", "Shelford's law of tolerance", "Shelford's law of intolerance"], correctAnswer: 0 },
  { id: 77, week: 7, assignment: 7, question: "\"Quick movement over large distances, often across unsuitable terrain\" is a description of", options: ["diffusion", "secular dispersal", "jump dispersal", "drifting"], correctAnswer: 2 },
  { id: 78, week: 7, assignment: 7, question: "\"The geographical distribution of a species will be controlled by that environmental factor for which the organism has the narrowest range of tolerance.\" This is the statement for", options: ["Liebig's law of the minimum", "Liebig's law of the maximum", "Shelford's law of tolerance", "Shelford's law of intolerance"], correctAnswer: 2 },
  { id: 79, week: 7, assignment: 7, question: "Good climate is a", options: ["chemical factor", "demographic factor", "push factor", "pull factor"], correctAnswer: 3 },
  { id: 80, week: 7, assignment: 7, question: "Scarcity of food is a", options: ["chemical factor", "demographic factor", "push factor", "pull factor"], correctAnswer: 2 },
  // Week 8
  { id: 81, week: 8, assignment: 8, question: "Zoo is an example of", options: ["in-situ conservation", "ex-situ conservation", "in-situ preservation", "ex-situ preservation"], correctAnswer: 1 },
  { id: 82, week: 8, assignment: 8, question: "The \"subset of physical and biotic environmental factors that permit an animal (or plant) to survive and reproduce\" is the definition of", options: ["habitat", "ecosystem", "biome", "biosphere"], correctAnswer: 0 },
  { id: 83, week: 8, assignment: 8, question: "Which of these correctly represents the process of habitat fragmentation and loss?", options: ["Original forest → Dissection → Perforation → Fragmentation → Attrition", "Original forest → Dissection → Attrition → Fragmentation → Perforation", "Original forest → Dissection → Perforation → Attrition → Fragmentation", "Original forest → Dissection → Fragmentation → Perforation → Attrition"], correctAnswer: 0 },
  { id: 84, week: 8, assignment: 8, question: "The acronym HIPPO does not include", options: ["habitat loss", "invasive species", "pollination", "pollution"], correctAnswer: 2 },
  { id: 85, week: 8, assignment: 8, question: "We prefer those areas for the creation of a conservation reserve where the level of threat is", options: ["very high", "medium", "very low", "non-existent"], correctAnswer: 1 },
  { id: 86, week: 8, assignment: 8, question: "The acronym HIPPO does not include", options: ["habitat loss", "habitat enhancement", "invasive species", "human over-population"], correctAnswer: 1 },
  { id: 87, week: 8, assignment: 8, question: "According to Leopold, which of these is not a tool of habitat management?", options: ["fire", "gun", "cattle", "sickle"], correctAnswer: 3 },
  { id: 88, week: 8, assignment: 8, question: "Captive breeding is an example of", options: ["in-situ conservation", "ex-situ conservation", "in-situ preservation", "ex-situ preservation"], correctAnswer: 1 },
  { id: 89, week: 8, assignment: 8, question: "Which of these is a stochastic factor?", options: ["birth rate", "death rate", "population structure", "environmental fluctuation"], correctAnswer: 3 },
  { id: 90, week: 8, assignment: 8, question: "Which of these is a deterministic factor?", options: ["environmental variation", "forest fire", "death rate", "diseases"], correctAnswer: 2 },
  // Week 9
  { id: 91, week: 9, assignment: 9, question: "Which of these is a positive check according to Malthus?", options: ["late marriage", "war", "celibacy", "moral restraint"], correctAnswer: 1 },
  { id: 92, week: 9, assignment: 9, question: "________ determines which projects or developments require a full or partial impact assessment study.", options: ["screening", "scoping", "reporting", "review"], correctAnswer: 0 },
  { id: 93, week: 9, assignment: 9, question: "Which of these is a pillar of sustainability", options: ["social sustainability", "industrial sustainability", "agricultural sustainability", "trans-boundary sustainability"], correctAnswer: 0 },
  { id: 94, week: 9, assignment: 9, question: "Which of these is not a pillar of sustainability?", options: ["environmental sustainability", "economic sustainability", "trans-boundary sustainability", "social sustainability"], correctAnswer: 2 },
  { id: 95, week: 9, assignment: 9, question: "The book \"An Essay on the Principle of Population\" was written by", options: ["Darwin", "Malthus", "Spencer", "Owens"], correctAnswer: 1 },
  { id: 96, week: 9, assignment: 9, question: "According to Malthusian model,", options: ["Population grows in geometric progression, food supply increases in arithmetic progression", "Population grows in geometric progression, food supply increases in geometric progression", "Population grows in arithmetic progression, food supply increases in arithmetic progression", "Population grows in arithmetic progression, food supply increases in geometric progression"], correctAnswer: 0 },
  { id: 97, week: 9, assignment: 9, question: "The quantum of human impacts is given by", options: ["I = P × A × T", "I = P + A + T", "I = P + A - T", "I = P - (A + T)"], correctAnswer: 0 },
  { id: 98, week: 9, assignment: 9, question: "____________is used to identify which potential impacts are relevant to assess.", options: ["screening", "scoping", "reporting", "review"], correctAnswer: 1 },
  { id: 99, week: 9, assignment: 9, question: "The demographic transition sees a society move from", options: ["high birth rate, low death rate to low birth rate, low death rate", "low birth rate, high death rate to low birth rate, low death rate", "high birth rate, high death rate to low birth rate, low death rate", "high birth rate, high death rate to low birth rate, high death rate"], correctAnswer: 2 },
  { id: 100, week: 9, assignment: 9, question: "Which of these is a preventive check according to Malthus?", options: ["foresight", "vice", "misery", "flood"], correctAnswer: 0 },
  // Week 10
  { id: 101, week: 10, assignment: 10, question: "Which of these is not a climatic forcing for Earth?", options: ["changes in plate tectonics", "changes in Earth's orbit", "changes in Sun's orbit", "changes in Sun's strength"], correctAnswer: 2 },
  { id: 102, week: 10, assignment: 10, question: "\"The ability of a system to adjust to climate change (including climate variability and extremes) to moderate potential damages, to take advantage of opportunities, or to cope with the consequences\" is a definition for", options: ["adaptive response", "adaptive capacity", "mitigative response", "mitigative capacity"], correctAnswer: 1 },
  { id: 103, week: 10, assignment: 10, question: "Which of these is not a principle of ecological restoration?", options: ["ecological integrity", "short-term sustainability", "benefits and engages society", "informed by past and future"], correctAnswer: 1 },
  { id: 104, week: 10, assignment: 10, question: "Mesodebris in the context of plastic debris has fragments of size", options: ["> 20 mm", "5 - 20 mm", "< 5 mm", "< 1 mm"], correctAnswer: 1 },
  { id: 105, week: 10, assignment: 10, question: "\"Any changes in natural or human systems that inadvertently increase vulnerability to climatic stimuli; an adaptation that does not succeed in reducing vulnerability but increases it instead\" is a definition for", options: ["adaptation", "mitigation", "maladaptation", "malmitigation"], correctAnswer: 2 },
  { id: 106, week: 10, assignment: 10, question: "Which of these is not a principle of ecological restoration?", options: ["ecological integrity", "long-term sustainability", "benefits and engages scientists", "informed by past and future"], correctAnswer: 2 },
  { id: 107, week: 10, assignment: 10, question: "Which of these is not a climatic forcing for Earth?", options: ["changes in plate tectonics", "changes in Earth's orbit", "changes in Moon's orbit", "changes in Sun's strength"], correctAnswer: 2 },
  { id: 108, week: 10, assignment: 10, question: "Because of climate change, Mudumalai Tiger Reserve is suffering from frequent droughts. The management has built several artificial water holes for animals, and fills them up regularly with tankers. In the context of climate change, such an action would be called", options: ["adaptation", "mitigation", "deceleration", "maladaptation"], correctAnswer: 0 },
  { id: 109, week: 10, assignment: 10, question: "Macrodebris in the context of plastic debris has fragments of size", options: ["> 20 mm", "5 - 20 mm", "< 5 mm", "< 1 mm"], correctAnswer: 0 },
  { id: 110, week: 10, assignment: 10, question: "The government came up with a regulation that incandescent bulbs be replaced by LED bulbs, so that electricity consumption and release of carbon dioxide from power plants is reduced. In the context of climate change, such an action would be called", options: ["adaptation", "mitigation", "deceleration", "maladaptation"], correctAnswer: 1 },
  // Week 11
  { id: 111, week: 11, assignment: 11, question: "Ludwig's ratchet predicts", options: ["decreasing harvesting rate", "constant harvesting rate", "increasing harvesting rate", "fluctuating harvesting rate"], correctAnswer: 2 },
  { id: 112, week: 11, assignment: 11, question: "A pest population is called controlled when", options: ["it is not increasing", "it is decreasing", "it is not causing any economic damage", "it is not causing excessive economic damage"], correctAnswer: 3 },
  { id: 113, week: 11, assignment: 11, question: "Which of these is not an impact of toxic chemicals?", options: ["lethal effects", "sub-lethal effects", "reduction of existing stressors", "reduced fecundity"], correctAnswer: 2 },
  { id: 114, week: 11, assignment: 11, question: "Which of these is correct?", options: ["The maximum sustainable yield is near the beginning of the sigmoidal curve.", "The maximum sustainable yield is near the mid-point of the sigmoidal curve.", "The maximum sustainable yield is near the end of the sigmoidal curve.", "None of these"], correctAnswer: 1 },
  { id: 115, week: 11, assignment: 11, question: "A root zone treatment plant is an example of", options: ["phytoremediation", "biological control", "biomagnification", "bioaccumulation"], correctAnswer: 0 },
  { id: 116, week: 11, assignment: 11, question: "A pest population is called uncontrolled when", options: ["it is increasing", "it is not decreasing", "it is causing some economic damage", "it is causing excessive economic damage"], correctAnswer: 3 },
  { id: 117, week: 11, assignment: 11, question: "The impact of El Nino on fishery collapse in Peru is explained by", options: ["match hypothesis", "mismatch hypothesis", "match-mismatch hypothesis", "none of these"], correctAnswer: 2 },
  { id: 118, week: 11, assignment: 11, question: "A deciduous forest in Madhya Pradesh was converted to a mine. After the mining operations were over, the pits were filled up with soil and species of deciduous forest planted again. This is an example of", options: ["recovery", "restoration", "enhancement", "replacement"], correctAnswer: 1 },
  { id: 119, week: 11, assignment: 11, question: "A deciduous forest in Madhya Pradesh was converted to a mine. After the mining operations were over, the pits were filled up with water and a lake was created. It is now visited by several migratory birds. This is an example of", options: ["recovery", "restoration", "enhancement", "replacement"], correctAnswer: 3 },
  { id: 120, week: 11, assignment: 11, question: "Which of these is correct?", options: ["R + G = M + F", "R + M = G + F", "R + F = M + G", "R + G + M + F = 0"], correctAnswer: 0 },
  // Week 12
  { id: 121, week: 12, assignment: 12, question: "Consider the food chain: Grass → Grasshopper → Frog → Snake → Hawk. As we move up the food chain,", options: ["available energy decreases", "available energy increases", "available energy remains same", "available energy is zero everywhere"], correctAnswer: 0 },
  { id: 122, week: 12, assignment: 12, question: "The government came up with a regulation that incandescent bulbs be replaced by LED bulbs, so that electricity consumption and release of carbon dioxide from power plants is reduced. In the context of climate change, such an action would be called", options: ["adaptation", "mitigation", "deceleration", "maladaptation"], correctAnswer: 1 },
  { id: 123, week: 12, assignment: 12, question: "The hierarchical system was given by", options: ["Simon", "Watson", "Hutchinson", "Humboldt"], correctAnswer: 0 },
  { id: 124, week: 12, assignment: 12, question: "Captive breeding is an example of", options: ["in-situ conservation", "ex-situ conservation", "in-situ preservation", "ex-situ preservation"], correctAnswer: 1 },
  { id: 125, week: 12, assignment: 12, question: "The climax near Tindni village is being controlled by disturbance by cattle. This is an example of", options: ["climatic climax", "edaphic climax", "disclimax", "catastrophic climax"], correctAnswer: 2 },
  { id: 126, week: 12, assignment: 12, question: "The demographic transition sees a society move from", options: ["high birth rate, low death rate to low birth rate, low death rate", "low birth rate, high death rate to low birth rate, low death rate", "high birth rate, high death rate to low birth rate, low death rate", "high birth rate, high death rate to low birth rate, high death rate"], correctAnswer: 2 },
  { id: 127, week: 12, assignment: 12, question: "The logistic growth equation, when plotted, appears", options: ["I shaped", "J shaped", "S shaped", "O shaped"], correctAnswer: 2 },
  { id: 128, week: 12, assignment: 12, question: "Hamilton's rule can be stated as", options: ["rB < C", "rB > C", "rB = C", "rB + C = 0"], correctAnswer: 1 },
  { id: 129, week: 12, assignment: 12, question: "Which of these is not a characteristic of fitness?", options: ["Fitness is environment-specific.", "Fitness is species-specific.", "Higher reproductive rate means higher fitness.", "Fitness should be measured across several generations."], correctAnswer: 2 },
  { id: 130, week: 12, assignment: 12, question: "\"Quick movement over large distances, often across unsuitable terrain\" is a description of", options: ["diffusion", "secular dispersal", "jump dispersal", "drifting"], correctAnswer: 2 }
];

export const oopsQuestions = [
  // OOPs Week 0
  { id: 201, week: 0, assignment: 0, question: "In C++, an array is a collection of _.", options: ["Random data elements", "Elements of different data types", "Elements stored in contiguous memory locations", "Only character data"], correctAnswer: 2 },
  { id: 202, week: 0, assignment: 0, question: "What is a data structure?", options: ["A way to store and organize data", "A programming language", "Function in C++", "Compiler tool"], correctAnswer: 0 },
  { id: 203, week: 0, assignment: 0, question: "Which of the following data structures uses the LIFO (Last In, First Out) principle?", options: ["Queue", "Stack", "Linked List", "Binary Tree"], correctAnswer: 1 },
  { id: 204, week: 0, assignment: 0, question: "What is an algorithm?", options: ["A programming language", "A specific data structure", "A step-by-step procedure to solve a problem", "A type of computer hardware"], correctAnswer: 2 },
  { id: 205, week: 0, assignment: 0, question: "What is the main purpose of using data structures in programming?", options: ["To make the code look better", "To efficiently manage and organize data", "To increase the size of the program", "To complicate the coding process"], correctAnswer: 1 },
  // OOPs Week 1
// OOPs Week 1
  { 
    id: 206, week: 1, assignment: 1, 
    question: "Which of the following OOP principles ensures that a derived class can modify behavior inherited from a base class?", 
    options: ["Inheritance", "Abstraction", "Encapsulation", "Polymorphism"], 
    correctAnswer: 3 
  },
  { 
    id: 207, week: 1, assignment: 1, 
    question: "Which of the following is not a characteristic of object-oriented programming?", 
    options: ["Encapsulation", "Polymorphism", "Functional composition", "Inheritance"], 
    correctAnswer: 2 
  },
  { 
    id: 208, week: 1, assignment: 1, 
    question: "If a class is considered a \"set\" in mathematical terms, which of the following could be considered as objects?", 
    options: ["Functions defined on the set", "Elements of the set", "Subsets of the set", "Realized instances of the set (e.g., empty set)"], 
    correctAnswer: 3 
  },
  { 
    id: 209, week: 1, assignment: 1, 
    question: "Encapsulation can be mathematically represented as:", 
    options: ["f: X → Y where X and Y represent private and public data, respectively.", "f: A → A where f is identity over the class.", "X = Y implying data and methods are the same.", "f: X → X where f is a structure-preserving map over private data."], 
    correctAnswer: 0 
  },
  { 
    id: 210, week: 1, assignment: 1, 
    question: "Which of the following best describes polymorphism in a mathematical sense?", 
    options: ["Multiple functions f1: A → B, f2: C → D, etc., with the same name but possibly independent input-output types.", "A single function f defined as f: A → B and f: C → D operating across different domains and codomains.", "A function f: A → A that maps elements within the same domain and codomain.", "A composite function f ◦ g: X → Y, where g: X → Z and f: Z → Y used to chain operations."], 
    correctAnswer: 0 
  },
  { 
    id: 211, week: 1, assignment: 1, 
    question: "Inheritance in OOP is most analogous to:", 
    options: ["Set theory: Subsets inheriting properties of supersets.", "Group theory: Groups inheriting properties of subgroups.", "Graph theory: Nodes inheriting edges.", "Linear algebra: Matrices inheriting vector spaces."], 
    correctAnswer: 0 
  },
  { 
    id: 212, week: 1, assignment: 1, 
    question: "Which of the following best encapsulates the core purpose of object-oriented programming?", 
    options: ["Maximizing code reuse and scalability.", "Simplifying logical flow in functional applications.", "Optimizing mathematical operations on datasets.", "Ensuring type safety at runtime."], 
    correctAnswer: 0 
  },
  { 
    id: 213, week: 1, assignment: 1, 
    question: "In an object-oriented system, relationships between objects are best modeled as:", 
    options: ["Directed graphs", "Bipartite graphs", "Sets with cardinality constraints", "Undirected graphs"], 
    correctAnswer: 0 
  },
  { 
    id: 214, week: 1, assignment: 1, 
    question: "Which of the following best explains the idea of abstraction in OOP?", 
    options: ["Hiding unnecessary details and showing only the relevant features.", "A mapping between two completely unrelated concepts.", "Defining all possible implementations explicitly in a class.", "Combining unrelated objects into a single type."], 
    correctAnswer: 0 
  },
  { 
    id: 215, week: 1, assignment: 1, 
    question: "Polymorphism in OOP is analogous to which of the following concepts?", 
    options: ["A function that behaves differently depending on the input.", "Using the same name for multiple variables in a program.", "A method that only works with one specific type of data.", "Changing the internal logic of a program without altering its behavior."], 
    correctAnswer: 0 
  },
  // OOPs Week 2
// OOPs Week 2
  { 
    id: 216, week: 2, assignment: 2, 
    question: "Which of the following best describes a class in object-oriented programming?", 
    options: ["A block of code that defines functions only.", "A blueprint for creating objects, encapsulating data and methods.", "A template for functions without data.", "A data structure for storing primitive data types."], 
    correctAnswer: 1 
  },
  { 
    id: 217, week: 2, assignment: 2, 
    question: "What happens when an object is created from a class in C++?", 
    options: ["Memory is allocated for the object's member variables only.", "Memory is allocated for member functions and variables.", "Member functions are inherited and memory is allocated for them.", "Member functions are shared across objects, and memory is allocated only for variables."], 
    correctAnswer: 3 
  },
  { 
    id: 218, week: 2, assignment: 2, 
    question: "Which of the following statements about constructors is false?", 
    options: ["Constructors must have the same name as the class.", "Constructors can be overloaded in C++.", "Constructors cannot be private in C++.", "Constructors do not have a return type."], 
    correctAnswer: 2 
  },
  { 
    id: 219, week: 2, assignment: 2, 
    question: "In a Java program to define a class Circle with:\n• A constructor that initializes its radius.\n• A method getArea() to return the area of the circle.\nIdentify the correct syntax to create an object of this class.", 
    options: ["Circle c1 = new Circle();", "Circle c1 = new Circle(radius);", "Circle c1 = Circle(radius);", "Circle c1 = new Circle[radius];"], 
    correctAnswer: 1 
  },
  { 
    id: 220, week: 2, assignment: 2, 
    question: "Consider the following C++ code:\n#include <iostream>\nclass Test {\npublic:\n  Test() { std::cout << \"Constructor called\\n\"; }\n  ~Test() { std::cout << \"Destructor called\\n\"; }\n  void display() { std::cout << \"Display function\\n\"; }\n};\nint main() {\n  Test t1;\n  t1.display();\n  return 0;\n}\nWhat is the output of this program?", 
    options: ["Constructor called\nDisplay function\nDestructor called", "Constructor called\nDestructor called\nDisplay function", "Display function\nConstructor called\nDestructor called", "Constructor called\nDisplay function"], 
    correctAnswer: 0 
  },
  { 
    id: 221, week: 2, assignment: 2, 
    question: "What is the primary purpose of a destructor in C++?", 
    options: ["To initialize an object when it is created.", "To release memory and resources when an object is destroyed.", "To overload operators for memory allocation.", "To define default behavior for inheritance."], 
    correctAnswer: 1 
  },
  { 
    id: 222, week: 2, assignment: 2, 
    question: "Consider the following C++ code:\n#include <iostream>\nclass Sample {\npublic:\n  Sample() { std::cout << \"Constructor called\\n\"; }\n  ~Sample() { std::cout << \"Destructor called\\n\"; }\n};\nvoid createObject() {\n  Sample obj;\n  std::cout << \"Inside createObject function\\n\";\n}\nint main() {\n  std::cout << \"Before calling createObject\\n\";\n  createObject();\n  std::cout << \"After calling createObject\\n\";\n  return 0;\n}\nWhat is the output of this program?", 
    options: ["Constructor called\nInside createObject function\nDestructor called\nBefore calling createObject\nAfter calling createObject", "Before calling createObject\nConstructor called\nInside createObject function\nDestructor called\nAfter calling createObject", "Before calling createObject\nInside createObject function\nConstructor called\nDestructor called\nAfter calling createObject", "Before calling createObject\nConstructor called\nInside createObject function\nAfter calling createObject\nDestructor called"], 
    correctAnswer: 1 
  },
  { 
    id: 223, week: 2, assignment: 2, 
    question: "A class in C++ has multiple constructors. How does the compiler decide which constructor to use?", 
    options: ["Based on the return type.", "Based on the arguments passed during object creation.", "The first constructor is always used.", "The last constructor is always used."], 
    correctAnswer: 1 
  },
  { 
    id: 224, week: 2, assignment: 2, 
    question: "In a C++ program that:\n• Defines a class FileHandler with a constructor that opens a file and a destructor that closes the file.\n• Demonstrates file handling using objects of this class.\nChoose the correct constructor signature:", 
    options: ["FileHandler(std::string filename);", "FileHandler(char* filename);", "FileHandler(const char filename[]);", "All of the above."], 
    correctAnswer: 3 
  },
  { 
    id: 225, week: 2, assignment: 2, 
    question: "Analyze the following C++ code and identify the correct output:\n#include <iostream>\nclass Rectangle {\n  int length, width;\npublic:\n  Rectangle(int l, int w) : length(l), width(w) {}\n  int area() { return length * width; }\n};\nint main() {\n  Rectangle rect(5, 3);\n  std::cout << rect.area();\n  return 0;\n}", 
    options: ["15", "8", "Compilation error", "Undefined behavior"], 
    correctAnswer: 0 
  },
  // OOPs Week 3
// OOPs Week 3
  { 
    id: 226, week: 3, assignment: 3, 
    question: "Consider the following code:\nclass A {\npublic:\n  void display() { std::cout << \"Base class A\\n\"; }\n};\nclass B : public A {\npublic:\n  void show() { std::cout << \"Derived class B\\n\"; }\n};\nint main() {\n  B obj;\n  obj.display();\n  obj.show();\n  return 0;\n}\nWhat is the output of the above program?", 
    options: ["Base class A\nDerived class B", "Derived class B\nBase class A", "Base class A", "Derived class B"], 
    correctAnswer: 0 
  },
  { 
    id: 227, week: 3, assignment: 3, 
    question: "In C++, ambiguity occurs in multiple inheritance when:", 
    options: ["A derived class has a method with the same name as a method in the base class.", "Two base classes have methods with the same name, and a derived class inherits from both.", "A derived class has no constructor defined.", "A base class has a private member function."], 
    correctAnswer: 1 
  },
  { 
    id: 228, week: 3, assignment: 3, 
    question: "In a program to demonstrate multilevel inheritance with the following requirements:\n• Class A contains a method display() that prints \"Class A\".\n• Class B inherits from A and adds a method show() that prints \"Class B\".\n• Class C inherits from B and adds a method output() that prints \"Class C\".\nWhich of the following correctly calls all three methods from an object of C?", 
    options: ["C obj; obj.display(); obj.show(); obj.output();", "B obj; obj.show(); obj.output();", "A obj; obj.display(); obj.show(); obj.output();", "C obj; obj.output();"], 
    correctAnswer: 0 
  },
  { 
    id: 229, week: 3, assignment: 3, 
    question: "Consider the following script:\nclass A {\n  void display() { System.out.println(\"Class A\"); }\n}\nclass B extends A {\n  void show() { System.out.println(\"Class B\"); }\n}\nclass C extends A {\n  void output() { System.out.println(\"Class C\"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    B objB = new B();\n    objB.display();\n    objB.show();\n    C objC = new C();\n    objC.display();\n    objC.output();\n  }\n}\nWhat is the output of the above program?", 
    options: ["Class A\nClass B\nClass A\nClass C", "Class B\nClass A\nClass C", "Class A\nClass A", "Class B\nClass C"], 
    correctAnswer: 0 
  },
  { 
    id: 230, week: 3, assignment: 3, 
    question: "Which of the following is true about method overriding in Java?", 
    options: ["The overridden method must have a different return type.", "The overridden method must have the same name and parameters as the base class method.", "The base class method must be private.", "Overriding is not possible in Java."], 
    correctAnswer: 1 
  },
  { 
    id: 231, week: 3, assignment: 3, 
    question: "Consider the following C++ code:\nclass Base {\npublic:\n  virtual void display() { std::cout << \"Base class\\n\"; }\n};\nclass Derived : public Base {\npublic:\n  void display() override { std::cout << \"Derived class\\n\"; }\n};\nint main() {\n  Base* ptr;\n  Derived obj;\n  ptr = &obj;\n  ptr->display();\n  return 0;\n}\nWhat is the output of the program?", 
    options: ["Base class", "Derived class", "Compilation error", "Undefined behavior"], 
    correctAnswer: 1 
  },
  { 
    id: 232, week: 3, assignment: 3, 
    question: "Which of the following statements about virtual functions is false?", 
    options: ["Virtual functions allow dynamic (runtime) polymorphism.", "A virtual function must be declared as virtual in the base class.", "A virtual function can have default arguments.", "A virtual function cannot be overridden in a derived class."], 
    correctAnswer: 3 
  },
  { 
    id: 233, week: 3, assignment: 3, 
    question: "Write a C++ program to demonstrate virtual functions with the following requirements:\n• Base class Shape has a virtual function area().\n• Derived class Rectangle overrides area() to compute the area of a rectangle.\n• Derived class Circle overrides area() to compute the area of a circle.\nWhich of the following correctly uses a base class pointer to call area() for both shapes?", 
    options: ["Shape* ptr; Rectangle rect; ptr = &rect; ptr->area();", "Shape* ptr = new Circle(); ptr->area();", "Both A and B", "None of the above"], 
    correctAnswer: 2 
  },
  { 
    id: 234, week: 3, assignment: 3, 
    question: "When a class is derived from a base class using protected inheritance, how are the public and protected members of the base class treated in the derived class?", 
    options: ["They both become private members in the derived class.", "They both remain public members in the derived class.", "They both become protected members in the derived class.", "They are inaccessible in the derived class."], 
    correctAnswer: 2 
  },
  { 
    id: 235, week: 3, assignment: 3, 
    question: "Which of the following is a potential problem associated with multiple inheritance in C++?", 
    options: ["Ambiguity in accessing members when two base classes have members with the same name.", "Lack of runtime polymorphism.", "Inability to overload operators in derived classes.", "Restriction on the number of base classes a derived class can inherit from."], 
    correctAnswer: 0 
  },
  // OOPs Week 4
// OOPs Week 4
  { 
    id: 236, week: 4, assignment: 4, 
    question: "Which of the following best describes polymorphism in object-oriented programming?", 
    options: ["A class having multiple constructors.", "The ability of different objects to respond to the same function call in different ways.", "A function having the same name as its class.", "None of the above."], 
    correctAnswer: 1 
  },
  { 
    id: 237, week: 4, assignment: 4, 
    question: "Which of the following is an example of static polymorphism?", 
    options: ["Method overloading", "Virtual functions", "Abstract classes", "Method overriding"], 
    correctAnswer: 0 
  },
  { 
    id: 238, week: 4, assignment: 4, 
    question: "Consider the following code:\nclass Complex {\n  int real, imag;\npublic:\n  Complex (int r, int i) : real(r), imag(i) {}\n  Complex operator+(const Complex& c) {\n    return Complex(real + c.real, imag + c.imag);\n  }\n  void display() {\n    std::cout << real << \"+\" << imag << \"i\" << std::endl;\n  }\n};\nint main() {\n  Complex c1(2,3), c2(4,5);\n  Complex c3=c1+c2;\n  c3.display();\n  return 0;\n}\nWhat is the output of this program?", 
    options: ["6 + 8i", "6 + 15i", "8 + 8i", "Compilation error"], 
    correctAnswer: 0 
  },
  { 
    id: 239, week: 4, assignment: 4, 
    question: "In a C++ program to overload the * operator for a class Matrix, where:\n• The class stores a 2D matrix as a private member.\n• The * operator multiplies two matrices.\n• The result of multiplication is displayed in the console.\nWhich of the following correctly implements the operator overloading?", 
    options: ["The operator is defined inside the class.", "The operator is defined as a friend function.", "Both A and B are valid.", "Operator overloading is not possible for matrix multiplication."], 
    correctAnswer: 2 
  },
  { 
    id: 240, week: 4, assignment: 4, 
    question: "Consider the following Java code:\nclass Calculator {\n  int add(int a, int b) {\n    return a+b;\n  }\n  double add(double a, double b) {\n    return a+b;\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Calculator calc = new Calculator();\n    System.out.println(calc.add(2, 3));\n    System.out.println(calc.add(2.5, 3.5));\n  }\n}\nWhat is the output of this program?", 
    options: ["5\n6.0", "5.0\n6.0", "Compilation error", "55"], 
    correctAnswer: 0 
  },
  { 
    id: 241, week: 4, assignment: 4, 
    question: "Which of the following demonstrates dynamic polymorphism?\nclass Base {\npublic:\n  virtual void display() { std::cout << \"Base class\\n\"; }\n};\nclass Derived : public Base {\npublic:\n  void display() override { std::cout << \"Derived class\\n\"; }\n};\nint main() {\n  Base* ptr;\n  Derived obj;\n  ptr = &obj;\n  ptr->display();\n  return 0;\n}\nWhat is the output of this program?", 
    options: ["Base class", "Derived class", "Compilation error", "Undefined behavior"], 
    correctAnswer: 1 
  },
  { 
    id: 242, week: 4, assignment: 4, 
    question: "Which of the following is true about virtual functions in C++?", 
    options: ["They allow runtime polymorphism.", "They must be redefined in the derived class.", "They can be called on an object of the base class.", "They cannot be used with pointers."], 
    correctAnswer: 0 
  },
  { 
    id: 243, week: 4, assignment: 4, 
    question: "Consider the following Java code:\nclass Animal {\n  void sound() {\n    System.out.println(\"Animal makes a sound\");\n  }\n}\nclass Dog extends Animal {\n  @Override\n  void sound() {\n    System.out.println(\"Dog barks\");\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Animal animal = new Dog();\n    animal.sound();\n  }\n}\nWhat is the output of this program?", 
    options: ["Animal makes a sound", "Dog barks", "Compilation error", "Undefined behavior"], 
    correctAnswer: 1 
  },
  { 
    id: 244, week: 4, assignment: 4, 
    question: "Which of the following is a limitation of static polymorphism?", 
    options: ["It requires pointers.", "It is resolved at compile time and cannot adapt to runtime behavior.", "It can only be implemented in C++.", "It cannot be overloaded."], 
    correctAnswer: 1 
  },
  { 
    id: 245, week: 4, assignment: 4, 
    question: "In a C++ program to demonstrate both static and dynamic polymorphism using the following:\n• Method overloading for static polymorphism.\n• Virtual functions for dynamic polymorphism.\nWhich of the following correctly calls both overloaded and overridden methods?", 
    options: ["Overloaded methods are called directly, and overridden methods are called using a base class pointer.", "Overloaded methods are called using a base class pointer, and overridden methods are called directly.", "Both methods are called directly.", "Both methods require pointers."], 
    correctAnswer: 0 
  },
  // OOPs Week 5
// OOPs Week 5
  { 
    id: 246, week: 5, assignment: 5, 
    question: "Consider the following C++ code:\nclass Example {\nprivate:\n  int secret;\npublic:\n  void setSecret (int value) {\n    secret = value;\n  }\n  int getSecret() {\n    return secret;\n  }\n};\nint main() {\n  Example obj;\n  obj.setSecret(42);\n  std::cout << obj.getSecret();\n  return 0;\n}\nWhat is the output of the program?", 
    options: ["0", "42", "Compilation error", "Undefined behavior"], 
    correctAnswer: 1 
  },
  { 
    id: 247, week: 5, assignment: 5, 
    question: "Which of the following access specifiers allows a member to be accessible only within the same package in Java?", 
    options: ["private", "protected", "Default (no modifier)", "public"], 
    correctAnswer: 2 
  },
  { 
    id: 248, week: 5, assignment: 5, 
    question: "Write a C++ program to demonstrate the use of all three access specifiers (public, protected, and private) in a class.\n• Define a Base class with three variables: one for each access specifier.\n• Define a Derived class that inherits from Base.\n• Show how the derived class can access the protected and public members but not the private member.\nWhich of the following is true?", 
    options: ["Private members are accessible in the derived class.", "Protected members are accessible in the derived class.", "Only public members are accessible in the derived class.", "None of the above."], 
    correctAnswer: 1 
  },
  { 
    id: 249, week: 5, assignment: 5, 
    question: "Consider the following C++ code:\nclass Shape {\npublic:\n  virtual void draw() = 0;\n};\nclass Circle : public Shape {\npublic:\n  void draw() override {\n    std::cout << \"Drawing Circle\" << std::endl;\n  }\n};\nint main() {\n  Circle c;\n  c.draw();\n  return 0;\n}\nWhat is the output of the program?", 
    options: ["Compilation error", "Drawing Circle", "No output", "Undefined behavior"], 
    correctAnswer: 1 
  },
  { 
    id: 250, week: 5, assignment: 5, 
    question: "Which of the following statements is true about abstract classes and interfaces in Java?", 
    options: ["An abstract class cannot have concrete methods.", "Interfaces can have constructors.", "An interface can extend another interface.", "Abstract classes cannot be inherited."], 
    correctAnswer: 2 
  },
  { 
    id: 251, week: 5, assignment: 5, 
    question: "Write a Java program that:\n• Defines an interface Shape with a method area().\n• Implements the interface in two classes: Circle and Rectangle.\n• Computes and displays the area of both shapes.\nWhat is the correct way to implement the area() method in Circle?", 
    options: ["public double area() { return Math.PI * radius * radius; }", "private double area() { return Math.PI * radius * radius; }", "public void area() { System.out.println(radius * radius); }", "protected double area() { return Math.PI * radius * radius; }"], 
    correctAnswer: 0 
  },
  { 
    id: 252, week: 5, assignment: 5, 
    question: "Consider the following C++ program:\nclass BankAccount {\nprivate:\n  double balance;\npublic:\n  BankAccount (double initial) : balance(initial) {}\n  void deposit (double amount) {\n    balance += amount;\n  }\n  double getBalance() {\n    return balance;\n  }\n};\nint main() {\n  BankAccount account(100.0);\n  account.deposit(50.0);\n  std::cout << account.getBalance();\n  return 0;\n}\nWhat is the output of this program?", 
    options: ["150.0", "100.0", "Compilation error", "Undefined behavior"], 
    correctAnswer: 0 
  },
  { 
    id: 253, week: 5, assignment: 5, 
    question: "Which of the following best describes the purpose of data hiding in OOP?", 
    options: ["To optimize memory usage.", "To prevent unauthorized access to class data.", "To allow multiple inheritance.", "To ensure faster compilation."], 
    correctAnswer: 1 
  },
  { 
    id: 254, week: 5, assignment: 5, 
    question: "What is a key difference between abstract classes and interfaces in Java?", 
    options: ["Abstract classes support multiple inheritance, interfaces do not.", "Abstract classes can have concrete methods, interfaces cannot.", "Interfaces can have static methods, abstract classes cannot.", "An interface can only be implemented, not extended."], 
    correctAnswer: 2 
  },
  { 
    id: 255, week: 5, assignment: 5, 
    question: "What is required for method overriding in polymorphism?", 
    options: ["The method must have the same name but different parameters.", "The method must have the same name, return type, and parameters in a parent and child class.", "The method must be marked as static.", "The method must be private in the base class."], 
    correctAnswer: 1 
  },
  // OOPs Week 6
// OOPs Week 6
  { 
    id: 256, week: 6, assignment: 6, 
    question: "What is the output of the following C++ code?\n#include <iostream>\nint main() {\n  try {\n    throw 42;\n  } catch (int e) {\n    std::cout << \"Caught exception: \" << e << std::endl;\n  }\n  return 0;\n}", 
    options: ["Caught exception: 42", "Compilation error", "Runtime error", "Undefined behavior"], 
    correctAnswer: 0 
  },
  { 
    id: 257, week: 6, assignment: 6, 
    question: "Which of the following is a checked exception in Java?", 
    options: ["ArithmeticException", "IOException", "NullPointerException", "ArrayIndexOutOfBoundsException"], 
    correctAnswer: 1 
  },
  { 
    id: 258, week: 6, assignment: 6, 
    question: "Which of the following correctly defines a custom exception in Java?\nclass MyException extends Exception {\n  public MyException (String message) {\n    super(message);\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      throw new MyException(\"Custom error\");\n    } catch (MyException e) {\n      System.out.println(e.getMessage());\n    }\n  }\n}\nWhat is the output of this program?", 
    options: ["Custom error", "Compilation error", "No output", "Runtime error"], 
    correctAnswer: 0 
  },
  { 
    id: 259, week: 6, assignment: 6, 
    question: "Consider the following C++ code:\n#include <iostream>\nint main() {\n  try {\n    throw \"An error occurred\";\n  } catch (const char* e) {\n    std::cout << \"String exception: \" << e << std::endl;\n  } catch (...) {\n    std::cout << \"Unknown exception caught\" << std::endl;\n  }\n  return 0;\n}\nWhat is the output of this program?", 
    options: ["String exception: An error occurred", "Unknown exception caught", "Compilation error", "No output"], 
    correctAnswer: 0 
  },
  { 
    id: 260, week: 6, assignment: 6, 
    question: "Which of the following is true about unchecked exceptions in Java?", 
    options: ["They must be declared in the method's throws clause.", "They must be handled using a try-catch block.", "They are not checked by the compiler at compile time.", "They do not extend Throwable."], 
    correctAnswer: 2 
  },
  { 
    id: 261, week: 6, assignment: 6, 
    question: "To write a custom exception class in C++ to handle invalid age inputs, what is the correct signature for the custom exception constructor?\n• The class should inherit from std::exception.\n• The constructor should accept a string message.\n• The what() method should return the custom message.", 
    options: ["InvalidAgeException(std::string msg);", "InvalidAgeException(const std::string& msg);", "InvalidAgeException(char* msg);", "All of the above."], 
    correctAnswer: 3 
  },
  { 
    id: 262, week: 6, assignment: 6, 
    question: "Which of the following statements about the finally block in Java is true?", 
    options: ["It is executed only if no exception is thrown.", "It is executed only if an exception is caught.", "It is executed regardless of whether an exception is thrown or caught.", "It is executed before the catch block."], 
    correctAnswer: 2 
  },
  { 
    id: 263, week: 6, assignment: 6, 
    question: "To write a Java program that:\n• Reads an integer input from the user.\n• Throws an ArithmeticException if the number is negative.\n• Throws an IOException if the input is not a valid number.\n• Catches and handles both exceptions.\nWhich of the following is a correct implementation?", 
    options: ["Two separate catch blocks for each exception.", "A single catch block with catch (Exception e).", "Nested try-catch blocks.", "Both A and C."], 
    correctAnswer: 3 
  },
  { 
    id: 264, week: 6, assignment: 6, 
    question: "Consider the following situations and select the correct exception type that would be thrown in the case- 'A function is called with an argument that is invalid for its operation.'", 
    options: ["std::invalid_argument", "std::length_error", "std::out_of_range", "std::runtime_error"], 
    correctAnswer: 0 
  },
  { 
    id: 265, week: 6, assignment: 6, 
    question: "Which of the following statements about the throws keyword in Java is correct?", 
    options: ["The throws keyword must be used for all exceptions, including unchecked exceptions like NullPointerException.", "The throws keyword is used in the method signature to declare checked exceptions that a method might throw, allowing the caller to handle them.", "The throws keyword is used to catch and handle exceptions within a method.", "The throws keyword automatically handles the exception without requiring a try-catch block."], 
    correctAnswer: 1 
  },
  // OOPs Week 7
// OOPs Week 7
  { 
    id: 266, week: 7, assignment: 7, 
    question: "Consider the following C++ code:\n#include <fstream>\n#include <iostream>\nint main() {\n  std::ifstream infile(\"example.txt\");\n  std::string line;\n  if (infile.is_open()) {\n    while (getline(infile, line)) {\n      std::cout << line << std::endl;\n    }\n  }\n  infile.close();\n  return 0;\n}\nIf the file example.txt contains the text \"File Handling in C++\", what is the output?", 
    options: ["File Handling in C++", "Prints nothing.", "Compilation error.", "Undefined behavior."], 
    correctAnswer: 0 
  },
  { 
    id: 267, week: 7, assignment: 7, 
    question: "To write a C++ program that reads the contents of a file input.txt and copies it to output.txt, which of the following achieves this?", 
    options: ["Using ifstream and ofstream to read and write line by line.", "Using ifstream and ofstream with a buffer.", "Both A and B.", "File copy cannot be achieved in C++."], 
    correctAnswer: 2 
  },
  { 
    id: 268, week: 7, assignment: 7, 
    question: "To write a Java program to serialize an object of a class Student with attributes name and id, which of the following statements is true about serialization in Java?", 
    options: ["The class must implement Serializable.", "Attributes must be declared as private.", "Serialization writes the object to a binary file.", "All of the above."], 
    correctAnswer: 3 
  },
  { 
    id: 269, week: 7, assignment: 7, 
    question: "What is the correct method to read a serialized object from a file in Java?", 
    options: ["readObject() from the ObjectInputStream.", "deserialize() from the Serializable interface.", "read() from the FileReader.", "deserialize() from the Deserializable interface."], 
    correctAnswer: 0 
  },
  { 
    id: 270, week: 7, assignment: 7, 
    question: "To write a C++ program to serialize a class Employee with attributes name and age with following functionality:\n• Write the object data to a binary file.\n• Read the object data back from the file.\nWhat is the correct method to write and read binary data using file streams?", 
    options: ["ofstream::write() and ifstream::read().", "ofstream::write() and ifstream::getline().", "ofstream::put() and ifstream::get().", "ofstream::getline() and ifstream::getline()."], 
    correctAnswer: 0 
  },
  { 
    id: 271, week: 7, assignment: 7, 
    question: "To write a Java program to merge the contents of two text files file1.txt and file2.txt into output.txt, which of the following steps is necessary?", 
    options: ["Open both input files using FileReader.", "Read the contents line by line and write them to the output file using FileWriter.", "Close all the files after the operation is complete.", "All of the above."], 
    correctAnswer: 3 
  },
  { 
    id: 272, week: 7, assignment: 7, 
    question: "What will be the output of this code?:\nimport java.io.*;\nclass SecretData implements Serializable {\n  private static final long serialVersionUID = 1L;\n  String info;\n  transient String password;\n  SecretData (String info, String password) {\n    this.info = info;\n    this.password = password;\n  }\n  private void writeObject(ObjectOutputStream oos) throws IOException {\n    oos.defaultWriteObject();\n    oos.writeObject(\"ENC(\" + password + \")\");\n  }\n  private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {\n    ois.defaultReadObject();\n    password = SecretDataManager.getUpdatedPassword((String) ois.readObject());\n  }\n}\nclass SecretDataManager {\n  private static String updatedPassword;\n  public static void setUpdatedPassword (String password) {\n    updatedPassword = password;\n  }\n  public static String getUpdatedPassword (String originalEncryptedPassword) {\n    return updatedPassword != null ? updatedPassword : decrypt(originalEncryptedPassword);\n  }\n  private static String decrypt (String encryptedPassword) {\n    return encryptedPassword.substring(4, encryptedPassword.length() - 1);\n  }\n}\npublic class CustomSerializationDemo {\n  public static void main(String[] args) throws Exception {\n    SecretData sd = new SecretData(\"Top Secret\", \"12345\");\n    try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(\"secret.ser\"))) {\n      oos.writeObject(sd);\n    }\n    sd.password = \"67890\";\n    SecretDataManager.setUpdatedPassword(\"67890\");\n    try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(\"secret.ser\"))) {\n      SecretData newSd = (SecretData) ois.readObject();\n      System.out.println(\"Info: \" + newSd.info);\n      System.out.println(\"Password: \" + newSd.password);\n    }\n  }\n}", 
    options: ["Info: Top Secret\nPassword: 1234567890", "Info: Top Secret\nPassword: 67890", "Info: Top Secret\nPassword: ENC (12345)", "Info: Top Secret\nPassword: ENC (67890)"], 
    correctAnswer: 1 
  },
  { 
    id: 273, week: 7, assignment: 7, 
    question: "In Java, which of the following statements about the readObject() method when customizing deserialization is correct?", 
    options: ["The readObject() method must call defaultReadObject() to ensure the non-transient fields are correctly deserialized.", "The readObject() method is only used for reading transient fields and should not call defaultReadObject().", "The readObject() method cannot be overridden in a Serializable class.", "The readObject() method is automatically generated by the Java compiler and cannot be customized."], 
    correctAnswer: 0 
  },
  { 
    id: 274, week: 7, assignment: 7, 
    question: "In C++, when serializing an object by writing its raw memory to a binary file using reinterpret_cast, which of the following statements is true regarding portability and object reconstruction?", 
    options: ["This method ensures platform-independent serialization, and the object can be safely deserialized on any machine.", "This method may lead to issues due to differences in endianness, padding, and alignment between different systems, making deserialization unsafe across platforms.", "The use of reinterpret_cast guarantees that the object's virtual table pointers are correctly serialized and deserialized.", "C++ provides built-in serialization support that handles these issues automatically."], 
    correctAnswer: 1 
  },
  { 
    id: 275, week: 7, assignment: 7, 
    question: "Considering the differences between text mode and binary mode in C++ file I/O, which of the following statements is accurate?", 
    options: ["In text mode, newline characters are translated to the system's native line-ending representation, while in binary mode, no such translation occurs.", "Binary mode is preferred for reading and writing text files because it handles newline characters correctly across different platforms.", "There is no difference between text mode and binary mode in modern C++ implementations.", "When opening a file in binary mode, data is automatically compressed to save space."], 
    correctAnswer: 0 
  },
  // OOPs Week 8
// OOPs Week 8
  { 
    id: 276, week: 8, assignment: 8, 
    question: "To write a template function in C++ to find the maximum of two values. Which of the following implementations is correct?", 
    options: ["template<typename T> T max(T a, T b) { return (a>b) ? a: b; }", "template<typename T> void max(T a, T b) { return (a>b) ? a: b; }", "template<int T> T max(T a, T b) { return (a>b) ? a: b; }", "template<typename T> T max(int a, int b) { return (a>b) ? a: b; }"], 
    correctAnswer: 0 
  },
  { 
    id: 277, week: 8, assignment: 8, 
    question: "Which of the following statements is true about template classes in C++?", 
    options: ["Template classes cannot have non-template member functions.", "Template classes can be instantiated for any data type.", "Template classes must inherit from a base class.", "Template classes cannot have constructors."], 
    correctAnswer: 1 
  },
  { 
    id: 278, week: 8, assignment: 8, 
    question: "To write a C++ program to define a template class Box with the following:\n• A private member to store data.\n• A constructor to initialize the data.\n• A method getData() to return the stored data.\nWhich of the following correctly instantiates the template class?", 
    options: ["Box<int> intBox(42);", "Box<int> intBox;", "Box<int, float> intBox(42);", "Box stringBox(\"Hello\");"], 
    correctAnswer: 0 
  },
  { 
    id: 279, week: 8, assignment: 8, 
    question: "What is the primary purpose of generics in Java?", 
    options: ["To allow multiple inheritance.", "To perform runtime type checking.", "To enforce compile-time type safety.", "To improve code execution speed."], 
    correctAnswer: 2 
  },
  { 
    id: 280, week: 8, assignment: 8, 
    question: "To write a generic class in Java called Container with the following:\n• A private attribute value of generic type T.\n• A constructor to initialize value.\n• A method getValue() to return the stored value.\nWhich of the following correctly defines the class?", 
    options: ["class Container<T> { private T value; }", "class Container { private T value; }", "class Container<T, U> { private T value; }", "class Container (T) { private T value; }"], 
    correctAnswer: 0 
  },
  { 
    id: 281, week: 8, assignment: 8, 
    question: "To write a Python function get_first_element() using generics that:\n• Accepts a list of any type.\n• Returns the first element of the list.\nWhich of the following correctly defines the function?", 
    options: ["def get_first_element(lst): return lst[0]", "from typing import List, TypeVar\nT = TypeVar('T')\ndef get_first_element(lst: List[T]) -> T: return lst[0]", "def get_first_element(lst: List[T]) -> T: return lst[0]", "from typing import TypeVar\nT = TypeVar('T')\ndef get_first_element(lst) -> T: return lst[0]"], 
    correctAnswer: 1 
  },
  { 
    id: 282, week: 8, assignment: 8, 
    question: "Which of the following is a common use case for templates in C++ and generics in Java?", 
    options: ["Creating reusable and type-safe data structures.", "Enforcing runtime type checking.", "Avoiding the use of constructors.", "Improving execution time by avoiding pointers."], 
    correctAnswer: 0 
  },
  { 
    id: 283, week: 8, assignment: 8, 
    question: "Which of the following is true about templates in C++ and generics in Java?", 
    options: ["Templates in C++ are resolved at runtime, while generics in Java are resolved at compile time.", "Generics in Java use type erasure, while templates in C++ do not.", "Both templates and generics support multiple inheritance.", "Templates and generics are identical in their implementation."], 
    correctAnswer: 1 
  },
  { 
    id: 284, week: 8, assignment: 8, 
    question: "Which of the following is not an advantage of using templates in C++?", 
    options: ["Dynamic Memory Allocation", "Code Reusability", "Performance Efficiency", "Type Safety"], 
    correctAnswer: 0 
  },
  { 
    id: 285, week: 8, assignment: 8, 
    question: "Consider the following Java code snippet:\nimport java.util.*;\nclass Container {\n  public static void addItem(List<? super Integer> list, Integer value) {\n    list.add(value);\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> intList = new ArrayList<>();\n    List<Double> doubleList = new ArrayList<>();\n    List<Number> numList = new ArrayList<>();\n    Container.addItem(intList, 10);\n    Container.addItem(numList, 20);\n    Container.addItem(doubleList, 30);\n  }\n}\nWhat will happen when this code is compiled and run?", 
    options: ["The code will compile and print the contents of the lists.", "The code will compile but it will throw a runtime exception.", "The code will fail to compile because List<Double> is incompatible with List<? super Integer>.", "The code will fail to compile because List<? super Integer> cannot accept Integer values."], 
    correctAnswer: 2 
  },
  // OOPs Week 9
// OOPs Week 9
  { 
    id: 286, week: 9, assignment: 9, 
    question: "Which of the following is an associative container in STL?", 
    options: ["vector", "deque", "set", "list"], 
    correctAnswer: 2 
  },
  { 
    id: 287, week: 9, assignment: 9, 
    question: "Which of the following containers allows bidirectional iterators in STL?", 
    options: ["vector", "deque", "set", "array"], 
    correctAnswer: 2 
  },
  { 
    id: 288, week: 9, assignment: 9, 
    question: "In a C++ program to:\n• Create a vector<int> containing the elements 5, 15, 10, 20, 25.\n• Use std::max_element() to find the maximum element.\nPrint the maximum element.\nWhat is the output of the program?", 
    options: ["25", "20", "Compilation error", "Undefined behavior"], 
    correctAnswer: 0 
  },
  { 
    id: 289, week: 9, assignment: 9, 
    question: "Which of the following is a non-modifying algorithm in STL?", 
    options: ["std::sort()", "std::copy()", "std::find()", "std::remove()"], 
    correctAnswer: 2 
  },
  { 
    id: 290, week: 9, assignment: 9, 
    question: "In a C++ program to:\n• Create a vector<int> containing 50, 10, 40, 30, 20.\n• Sort the vector in ascending order using std::sort().\nPrint the sorted elements.\nWhat is the correct sequence of output?", 
    options: ["10 20 30 40 50", "50 40 30 20 10", "Compilation error", "Undefined behavior"], 
    correctAnswer: 0 
  },
  { 
    id: 291, week: 9, assignment: 9, 
    question: "In a C++ program that:\n• Creates a map<string, int> to store student names and their marks.\n• Adds the entries Alice: 90, Bob: 85, Charlie: 95.\n• Prints all entries using an iterator.\nWhat is the correct output?", 
    options: ["Alice: 90, Bob: 85, Charlie: 95", "Bob: 85, Charlie: 95, Alice: 90", "Compilation error", "Undefined behavior"], 
    correctAnswer: 0 
  },
  { 
    id: 292, week: 9, assignment: 9, 
    question: "In a program to:\n• Create a set<int> containing the elements 50, 10, 30, 20, 40.\n• Use an iterator to traverse the set and print the elements.\n• Use std::find() to check if 30 exists in the set.\nWhich of the following is true?", 
    options: ["The output is sorted in ascending order, and 30 is found.", "The output is sorted in descending order, and 30 is not found.", "The elements are printed in the order they were added.", "Compilation error."], 
    correctAnswer: 0 
  },
  { 
    id: 293, week: 9, assignment: 9, 
    question: "Which of the following operations is not directly supported by the std::list container in C++ (which implements a doubly linked list)?", 
    options: ["Insertion of elements at the front of the list", "Insertion of elements at the back of the list", "Direct access to elements by index", "Removal of elements from the front of the list"], 
    correctAnswer: 2 
  },
  { 
    id: 294, week: 9, assignment: 9, 
    question: "Consider the following C++ code snippet. What will be the output?\n#include <iostream>\n#include <vector>\nint main() {\n  std::vector<int> vec {1, 2, 3, 4, 5};\n  std::vector<int>::iterator it = vec.begin();\n  std::advance(it, 2);\n  *it = 10;\n  for (auto i = vec.begin(); i != vec.end(); ++i) {\n    std::cout << *i << \" \";\n  }\n  return 0;\n}", 
    options: ["1 2 3 4 5", "1 2 10 4 5", "1 2 3 10 5", "1 2 3 4 10"], 
    correctAnswer: 1 
  },
  { 
    id: 295, week: 9, assignment: 9, 
    question: "What will be the output of the following C++ program?\n#include <iostream>\n#include <deque>\nusing namespace std;\nint main() {\n  deque<int> dq;\n  dq.push_back(10);\n  dq.push_front(20);\n  dq.push_back(30);\n  dq.push_front(40);\n  dq.pop_back();\n  dq.pop_front();\n  for (int x : dq) {\n    cout << x << \" \";\n  }\n  return 0;\n}", 
    options: ["10 30", "20 10", "20 30", "10 20"], 
    correctAnswer: 1 
  },
  // OOPs Week 10
  { 
    id: 296, week: 10, assignment: 10, 
    question: "Which of the following is the primary purpose of the Singleton pattern?", 
    options: ["To allow multiple instances of a class.", "To restrict a class to a single instance and provide global access to it.", "To create objects based on a condition.", "To improve inheritance in a class hierarchy."], 
    correctAnswer: 1 
  },
  { 
    id: 297, week: 10, assignment: 10, 
    question: "Analyze the following C++ implementation of the Singleton pattern:\nclass Singleton {\nprivate:\n  static Singleton* instance;\n  Singleton() {}\npublic:\n  static Singleton* getInstance() {\n    if (!instance) {\n      instance = new Singleton();\n    }\n    return instance;\n  }\n};\nSingleton* Singleton::instance = nullptr;\nint main() {\n  Singleton* obj1 = Singleton::getInstance();\n  Singleton* obj2 = Singleton::getInstance();\n  if (obj1 == obj2) {\n    std::cout << \"Same instance\";\n  }\n  return 0;\n}\nWhat is the output of this program?", 
    options: ["Same instance", "Different instance", "Compilation error", "Undefined behavior"], 
    correctAnswer: 0 
  },
  { 
    id: 298, week: 10, assignment: 10, 
    question: "To write a Java implementation of the Singleton pattern that ensures thread safety. Which of the following is a correct implementation?", 
    options: ["Use synchronized blocks in getInstance().", "Use the volatile keyword with the instance variable.", "Use a static block for initialization.", "All of the above."], 
    correctAnswer: 3 
  },
  { 
    id: 299, week: 10, assignment: 10, 
    question: "To write a C++ implementation of the Factory pattern to create objects of classes Circle and Square, both inheriting from an abstract base class Shape. Which of the following correctly defines the createShape() method?", 
    options: ["Shape* createShape(const std::string& type)", "Circle* createShape(const std::string& type)", "Square createShape(const std::string& type)", "Shape createShape(const std::string& type)"], 
    correctAnswer: 0 
  },
  { 
    id: 300, week: 10, assignment: 10, 
    question: "What is the primary purpose of the Observer pattern?", 
    options: ["To create a single global instance of a class.", "To allow one object to notify multiple objects of a change in its state.", "To encapsulate algorithms in separate classes.", "To improve memory management in object-oriented design."], 
    correctAnswer: 1 
  },
  { 
    id: 301, week: 10, assignment: 10, 
    question: "To write a Java program to demonstrate the Observer pattern using:\n• An Observer interface.\n• A concrete Subject class to notify observers.\n• Multiple concrete observer classes that react to state changes.\nWhich of the following correctly implements the notify() method in the Subject class?", 
    options: ["Iterate through the list of observers and call their update() method.", "Use a static method to update all observers.", "Use inheritance to notify all observers.", "Store observer states in a database."], 
    correctAnswer: 0 
  },
  { 
    id: 302, week: 10, assignment: 10, 
    question: "Which of the following statements is true about Singleton, Factory, and Observer patterns?", 
    options: ["The Singleton pattern is used for global access, the Factory pattern for object creation, and the Observer pattern for state management.", "The Factory pattern is a creational pattern, while Singleton and Observer are structural patterns.", "The Observer pattern is always implemented using threads.", "The Singleton pattern ensures that an object is immutable."], 
    correctAnswer: 0 
  },
  { 
    id: 303, week: 10, assignment: 10, 
    question: "Which of the following use cases combines multiple design patterns?", 
    options: ["A logging system using Singleton for a logger instance and Observer for notifying log subscribers.", "A database system using Factory for creating connections and Observer for managing connection pools.", "Both A and B.", "Design patterns cannot be combined."], 
    correctAnswer: 2 
  },
  { 
    id: 304, week: 10, assignment: 10, 
    question: "Consider the following C++ implementation where the Adapter Pattern is used to make a legacy OldPrinter class compatible with a modern PrinterInterface.\nclass PrinterInterface {\npublic:\n  virtual void print() = 0;\n};\nclass OldPrinter {\npublic:\n  void legacyPrint() {\n    std::cout << \"Legacy printing...\\n\";\n  }\n};\nclass PrinterAdapter : public PrinterInterface {\nprivate:\n  OldPrinter* oldPrinter;\npublic:\n  PrinterAdapter(OldPrinter* printer) : oldPrinter(printer) {}\n  void print() override {\n    oldPrinter->legacyPrint();\n  }\n};\nint main() {\n  OldPrinter oldPrinter;\n  PrinterInterface* printer = new PrinterAdapter(&oldPrinter);\n  printer->print();\n  delete printer;\n  return 0;\n}\nWhich of the following statements is true about the adapter pattern in the above code?", 
    options: ["The PrinterAdapter class allows OldPrinter to be used directly without any modifications to the OldPrinter class.", "The PrinterAdapter class replaces the OldPrinter class completely.", "The PrinterAdapter class extends PrinterInterface and provides a new method legacyPrint().", "The PrinterAdapter class requires OldPrinter to inherit from PrinterInterface for the code to compile."], 
    correctAnswer: 0 
  },
  { 
    id: 305, week: 10, assignment: 10, 
    question: "Which of the following is a primary purpose of the Proxy Pattern?", 
    options: ["To allow an object to send notifications to all its observers.", "To provide a surrogate or placeholder for another object to control access and interactions.", "To enable the creation of multiple independent instances of a class.", "To ensure that a class only has one instance throughout the application."], 
    correctAnswer: 1 
  },
// OOPs Week 11
  { 
    id: 306, week: 11, assignment: 11, 
    question: "To write a C++ program that uses std::thread to execute two functions concurrently:\n• printHello() prints \"Hello\" five times.\n• printWorld() prints \"World\" five times.\nWhat is the correct way to join threads after starting them?", 
    options: ["Use thread1.start() and thread1.join().", "Use thread1.join() and thread2.join().", "Use thread1.detach() and thread2.detach().", "Threads cannot be joined in C++."], 
    correctAnswer: 1 
  },
  { 
    id: 307, week: 11, assignment: 11, 
    question: "Which of the following is true about the Runnable interface in Java?", 
    options: ["It has a method called run() that must be overridden.", "It can only be used with the Thread class.", "It supports multiple inheritance.", "It cannot be implemented in a lambda expression."], 
    correctAnswer: 0 
  },
  { 
    id: 308, week: 11, assignment: 11, 
    question: "To write a Java program that creates two threads to:\n• Print numbers from 1 to 5 in one thread.\n• Print the squares of numbers from 1 to 5 in another thread.\nWhich of the following correctly starts both threads?", 
    options: ["new Thread(thread1).run(); new Thread(thread2).run();", "thread1.start(); thread2.start();", "new Thread(thread1).start(); new Thread (thread2).start();", "thread1.run(); thread2.run();"], 
    correctAnswer: 2 
  },
  { 
    id: 309, week: 11, assignment: 11, 
    question: "To write a Python program that creates a TCP server to:\n• Accept connections from clients.\n• Receive a message from the client and print it.\n• Send an acknowledgment back to the client.\nWhich of the following is the correct method to bind the server to a port?", 
    options: ["server.bind(('localhost', 8080))", "server.listen(8080)", "server.start(('localhost', 8080))", "server.connect(('localhost', 8080))"], 
    correctAnswer: 0 
  },
  { 
    id: 310, week: 11, assignment: 11, 
    question: "To write a Java Swing program that creates a window with:\n• A JButton labeled \"Click Me\".\n• An event listener that displays \"Button Clicked\" in the console when the button is clicked.\nWhich of the following methods is used to add an event listener to the button?", 
    options: ["button.addActionListener()", "button.addListener()", "button.onClick()", "button.setActionListener()"], 
    correctAnswer: 0 
  },
  { 
    id: 311, week: 11, assignment: 11, 
    question: "To write a program to:\n• Create a multithreaded TCP server that handles multiple clients simultaneously.\n• Use threads to process client requests independently.\nWhich of the following is essential for the server to handle multiple clients?", 
    options: ["Use thread.join() for each client connection.", "Use a separate thread for each client connection.", "Use a single thread for all client connections.", "Use the poll() function to manage threads."], 
    correctAnswer: 1 
  },
  { 
    id: 312, week: 11, assignment: 11, 
    question: "Consider the following code that implements an Observer Pattern for monitoring earthquake magnitudes.\nWhat will be the output of the program?\n#include <iostream>\n#include <vector>\nusing namespace std;\nclass Observer {\npublic:\n  virtual void update (double magnitude) = 0;\n};\nclass EarthquakeMonitor : public Observer {\npublic:\n  void update (double magnitude) override {\n    if (magnitude > 5.0) {\n      cout << \"Alert: Significant earthquake of magnitude \" << magnitude << \" detected!\" << endl;\n    }\n  }\n};\nclass Subject {\n  vector<Observer*> observers;\n  double magnitude;\npublic:\n  void attach (Observer* obs) { observers.push_back(obs); }\n  void notify() {\n    for (Observer* obs : observers) obs->update (magnitude);\n  }\n  void setMagnitude (double mag) {\n    magnitude = mag;\n    notify();\n  }\n};\nint main() {\n  Subject earthquakeData;\n  EarthquakeMonitor monitor;\n  earthquakeData.attach(&monitor);\n  earthquakeData.setMagnitude (4.2);\n  earthquakeData.setMagnitude (5.8);\n  return 0;\n}", 
    options: ["Alert: Significant earthquake of magnitude 4.2 detected!\nAlert: Significant earthquake of magnitude 5.8 detected!", "Alert: Significant earthquake of magnitude 5.8 detected!", "No output", "Runtime error: Null reference to observer"], 
    correctAnswer: 1 
  },
  { 
    id: 313, week: 11, assignment: 11, 
    question: "Consider the following Java code snippet:\nclass SharedResource {\n  synchronized void display (String message) {\n    for (int i=0; i<3; i++) {\n      System.out.println(message + \" \" + i);\n      try {\n        Thread.sleep(100);\n      } catch (InterruptedException e) {\n        e.printStackTrace();\n      }\n    }\n  }\n}\nclass MyThread extends Thread {\n  SharedResource resource;\n  String message;\n  MyThread (SharedResource resource, String message) {\n    this.resource = resource;\n    this.message = message;\n  }\n  public void run() {\n    resource.display(message);\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    SharedResource resource = new SharedResource();\n    MyThread t1 = new MyThread (resource, \"Thread-1\");\n    MyThread t2 = new MyThread(resource, \"Thread-2\");\n    t1.start();\n    t2.start();\n  }\n}\nWhat will the output of the program?", 
    options: ["Both Thread-1 and Thread-2 will interleave their output, as synchronization only applies to individual iterations of the loop.", "Only Thread-1 will execute its complete task, followed by Thread-2.", "Both threads will execute concurrently without any synchronization effects.", "Both threads will execute their tasks in sequence, with Thread-1 completing first and Thread-2 starting only after Thread-1 finishes."], 
    correctAnswer: 3 
  },
  { 
    id: 314, week: 11, assignment: 11, 
    question: "Which scenario causes a thread to transition directly from the \"Running\" state to the \"Terminated\" state in Java?", 
    options: ["The join() method is invoked on the thread object, causing the thread to stop execution immediately.", "The thread completes its execution of the run() method without encountering exceptions or interruptions.", "The sleep() method is called inside the thread, and the thread's sleep time expires.", "The thread enters a synchronized block and encounters contention for a lock."], 
    correctAnswer: 1 
  },
  { 
    id: 315, week: 11, assignment: 11, 
    question: "What does the following code snippet demonstrate?\n#include <iostream>\n#include <future>\n#include <chrono>\nint computeValue() {\n  std::this_thread::sleep_for(std::chrono::seconds(2));\n  return 42;\n}\nint main() {\n  auto futureValue = std::async(std::launch::async, computeValue);\n  std::cout << \"Processing...\" << std::endl;\n  std::cout << \"Value: \" << futureValue.get() << std::endl;\n  return 0;\n}", 
    options: ["Parallel computation using a new thread for computeValue().", "Deferred execution of computeValue() until futureValue.get() is called.", "Immediate execution of computeValue() in the main thread.", "Compilation error due to incorrect usage of std::async."], 
    correctAnswer: 0 
  },
  // OOPs Week 12
  { id: 316, week: 12, assignment: 12, question: "Which of the following statements about constructors in Java is correct?", options: ["Constructors can have a return type.", "A class can have only one constructor.", "Constructors are automatically called when an object is created.", "Constructors cannot be overloaded."], correctAnswer: 2 },
  { id: 317, week: 12, assignment: 12, question: "Which of the following best describes dynamic polymorphism?", options: ["Function overloading", "Operator overloading", "Method overriding", "Constructor overloading"], correctAnswer: 2 },
  { id: 318, week: 12, assignment: 12, question: "Which of the following best describes data hiding?", options: ["Using access specifiers to restrict access to class members.", "Declaring all attributes as public.", "Avoiding the use of constructors.", "Using only static methods in a class."], correctAnswer: 0 },
  { id: 319, week: 12, assignment: 12, question: "Which of the following is a checked exception in Java?", options: ["ArithmeticException", "IOException", "NullPointerException", "ArrayIndexOutOfBoundsException"], correctAnswer: 1 },
  { id: 320, week: 12, assignment: 12, question: "Which of the following correctly opens a file for reading and writing in C++?", options: ["std::ifstream file(\"data.txt\");", "std::ofstream file(\"data.txt\");", "std::fstream file(\"data.txt\", std::ios::in | std::ios::out);", "std::ofstream file(\"data.txt\", std::ios::in);"], correctAnswer: 2 },
  { id: 321, week: 12, assignment: 12, question: "What is the purpose of templates in C++?", options: ["To enforce runtime type safety.", "To create reusable code that works with any data type.", "To implement runtime polymorphism.", "To overload operators."], correctAnswer: 1 },
  { id: 322, week: 12, assignment: 12, question: "Which of the following is a non-modifying STL algorithm?", options: ["std::sort()", "std::find()", "std::copy()", "std::remove()"], correctAnswer: 1 },
  { id: 323, week: 12, assignment: 12, question: "Which of the following is a creational design pattern?", options: ["Singleton", "Observer", "Factory", "Both A and C"], correctAnswer: 3 },
  { id: 324, week: 12, assignment: 12, question: "Which of the following is true about std::thread in C++?", options: ["It can only execute functions, not lambdas.", "Threads cannot be joined.", "A thread must be joined or detached before destruction.", "It does not support concurrency."], correctAnswer: 2 },
  { id: 325, week: 12, assignment: 12, question: "You want to add 0.5 to every earthquake magnitude and store it in adjusted_magnitudes. Which correctly performs this?", options: ["std::transform(magnitudes.begin(), magnitudes.end(), adjusted_magnitudes.begin(), [](double mag){ return mag + 0.5; });", "std::replace(magnitudes.begin(), magnitudes.end(), 6.0, 6.5);", "std::replace_if(magnitudes.begin(), magnitudes.end(), [](double mag){ return mag >= 5.0; }, 5.5);", "adjusted_magnitudes = std::transform(...);"], correctAnswer: 0 }
];

// ==========================================
// COMPONENTS
// ==========================================

function LandingPage({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('ecology');

  const handleStart = () => {
    const validation = validateName(name);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    onStart(name.trim(), subject);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
      subject === 'ecology' 
        ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600' 
        : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600'
    }`}>
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-[1.02] transition-transform duration-300">
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            onClick={() => setSubject('ecology')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              subject === 'ecology' 
                ? 'bg-green-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            🌿 Wildlife Ecology
          </button>
          <button
            onClick={() => setSubject('oops')}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              subject === 'oops' 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <Code className="w-5 h-5" />
            OOPs Practice
          </button>
        </div>

        <div className="text-center mb-8">
          <div className={`inline-block p-4 rounded-full mb-4 ${
            subject === 'ecology' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}>
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {subject === 'ecology' ? 'Wildlife Ecology' : 'OOPs Concepts'} Mock Test
          </h1>
          <p className="text-xl text-gray-600 mb-2">Test Your Knowledge</p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Up to 50 Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Random Selection</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Your full name"
              className={`w-full px-6 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-xl outline-none transition-all placeholder:text-gray-400 ${
                subject === 'ecology' ? 'focus:border-green-500 focus:ring-4 focus:ring-green-200' : 'focus:border-blue-500 focus:ring-4 focus:ring-blue-200'
              }`}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={handleStart}
            className={`w-full text-white py-4 px-8 rounded-xl font-bold text-lg transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3 ${
              subject === 'ecology' 
                ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            Start Quiz
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-3">Developed with 💜 by <span className="font-bold text-gray-800">Aryan Kanojia</span></p>
        </div>
      </div>
    </div>
  );
}

function QuizInterface({ studentName, subjectTheme, questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const hasAnswered = answers[currentQuestion.id] !== undefined;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  
  const themeColor = subjectTheme === 'ecology' ? 'green' : 'blue';

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[questions[currentIndex + 1].id] ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[questions[currentIndex - 1].id] ?? null);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentIndex(index);
    setSelectedOption(answers[questions[index].id] ?? null);
    setShowNavigator(false);
  };

  const handleSubmit = () => {
    if (allAnswered) onComplete(answers);
  };

  return (
    <div className={`min-h-screen ${subjectTheme === 'ecology' ? 'bg-gradient-to-br from-green-50 to-teal-50' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-md">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black truncate">{studentName}</h2>
              <p className="text-sm text-gray-600">Q {currentIndex + 1}/{questions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold mb-1">Progress</div>
              <div className={`text-xl font-bold text-${themeColor}-600`}>{answeredCount}/{questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className={`bg-${themeColor}-500 h-2 rounded-full transition-all duration-300`} style={{ width: `${progress}%` }} />
          </div>
          <button
            onClick={() => setShowNavigator(!showNavigator)}
            className={`w-full px-4 py-2.5 bg-${themeColor}-600 text-white rounded-lg font-semibold hover:bg-${themeColor}-700 transition-all flex items-center justify-center gap-2`}
          >
            {showNavigator ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            {showNavigator ? 'Close Navigator' : 'Question Navigator'}
          </button>
        </div>
      </div>

      {showNavigator && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowNavigator(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Jump to Question</h3>
              <button onClick={() => setShowNavigator(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                      index === currentIndex ? `bg-${themeColor}-600 text-white` : isAnswered ? 'bg-gray-800 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Welcome, {studentName}!</h2>
                  <p>Question {currentIndex + 1} of {questions.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm mb-1">Progress</div>
                  <div className={`text-2xl font-bold text-${themeColor}-600`}>{answeredCount}/{questions.length}</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className={`bg-${themeColor}-500 h-3 rounded-full transition-all duration-300`} style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
              <div className="mb-4 md:mb-6">
                <span className={`inline-block px-3 py-1.5 md:px-4 md:py-2 bg-${themeColor}-100 text-${themeColor}-700 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4`}>
                  Question {currentIndex + 1}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed whitespace-pre-line">
                  {currentQuestion.question}
                </h3>
              </div>

              <div className="space-y-2 md:space-y-3">
                {currentQuestion.shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-3 md:p-5 rounded-xl border-2 transition-all ${
                      selectedOption === index
                        ? `border-${themeColor}-500 bg-${themeColor}-50 shadow-md`
                        : `border-gray-200 hover:border-${themeColor}-300 hover:bg-${themeColor}-50`
                    }`}
                  >
                    <div className="flex items-start md:items-center gap-3 md:gap-4">
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0 ${
                        selectedOption === index ? `border-${themeColor}-500 bg-${themeColor}-500` : 'border-gray-300'
                      }`}>
                        {selectedOption === index && <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full" />}
                      </div>
                      <span className="text-sm md:text-lg text-gray-800 font-medium leading-snug whitespace-pre-line">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <div className="flex gap-2">
                <button onClick={handlePrevious} disabled={currentIndex === 0} className="flex-1 px-4 py-3 bg-gray-200 text-black rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                  <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Previous</span>
                </button>
                {currentIndex === questions.length - 1 ? (
                  <button onClick={handleSubmit} disabled={!allAnswered} className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    Submit <Trophy className="w-5 h-5" />
                  </button>
                ) : (
                  <button onClick={handleNext} className={`flex-1 px-4 py-3 bg-${themeColor}-500 text-white rounded-xl font-semibold hover:bg-${themeColor}-600 transition-all flex items-center justify-center gap-2`}>
                    <span className="hidden sm:inline">Next</span> <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
              {!allAnswered && currentIndex === questions.length - 1 && (
                <p className="text-center text-red-500 text-xs md:text-sm mt-3">Please answer all questions before submitting</p>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold mb-4 text-lg">Question Navigator</h3>
              <div className="grid grid-cols-5 gap-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {questions.map((q, index) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = index === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(index)}
                      className={`aspect-square rounded-lg font-semibold text-sm transition-all transform hover:scale-110 ${
                        isCurrent ? `bg-${themeColor}-600 text-white scale-110 shadow-md` : isAnswered ? 'bg-gray-800 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultPage({ studentName, subjectTheme, questions, answers, onRestart }) {
  const results = calculateResults(questions, answers);
  const themeColor = subjectTheme === 'ecology' ? 'green' : 'blue';

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return { msg: "Outstanding! You've mastered the concepts!", color: "text-green-600" };
    if (percentage >= 70) return { msg: "Great job! You have strong understanding!", color: "text-blue-600" };
    if (percentage >= 50) return { msg: "Good effort! Review the topics you missed.", color: "text-yellow-600" };
    return { msg: "Keep studying! Review all the materials.", color: "text-orange-600" };
  };

  const performance = getPerformanceMessage(parseFloat(results.percentage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl shadow-2xl p-8 mb-6 bg-white border-4 border-gray-200">
          <div className="text-center">
            <div className={`inline-block p-4 rounded-full mb-4 ${results.passed ? 'bg-green-100' : 'bg-orange-100'}`}>
              {results.passed ? <Trophy className="w-16 h-16 text-green-600" /> : <RotateCcw className="w-16 h-16 text-orange-600" />}
            </div>
            <h1 className="text-4xl font-bold mb-2">{results.passed ? 'Congratulations!' : 'Keep Learning!'}</h1>
            <p className="text-xl mb-2 font-semibold">{studentName}</p>
            <p className={`text-lg font-bold mb-6 ${performance.color} bg-gray-100 px-4 py-2 rounded-lg inline-block`}>{performance.msg}</p>
            
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className={`bg-${themeColor}-100 rounded-xl p-4 border-2 border-${themeColor}-200`}>
                <div className="text-3xl font-bold">{results.percentage}%</div>
                <div className="text-sm font-semibold">Score</div>
              </div>
              <div className="bg-green-100 rounded-xl p-4 border-2 border-green-200">
                <div className="text-3xl font-bold">{results.correct}</div>
                <div className="text-sm font-semibold">Correct</div>
              </div>
              <div className="bg-red-100 rounded-xl p-4 border-2 border-red-200">
                <div className="text-3xl font-bold">{results.incorrect}</div>
                <div className="text-sm font-semibold">Incorrect</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Detailed Results</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {results.details.map((detail, index) => (
              <div key={detail.questionId} className={`p-4 rounded-xl border-2 ${detail.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-start gap-3">
                  {detail.isCorrect ? <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> : <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold bg-${themeColor}-100 text-${themeColor}-700 px-2 py-1 rounded`}>
                        Week {detail.week} • Assignment {detail.assignment}
                      </span>
                    </div>
                    <p className="font-semibold mb-2 whitespace-pre-line">Q{index + 1}: {detail.question}</p>
                    <div className="text-sm space-y-1">
                      <p><span className="font-semibold">Your answer: </span><span className={`font-medium whitespace-pre-line ${detail.isCorrect ? 'text-green-700' : 'text-red-700'}`}>{detail.userAnswer}</span></p>
                      {!detail.isCorrect && <p><span className="font-semibold">Correct answer: </span><span className="font-medium text-green-700 whitespace-pre-line">{detail.correctAnswer}</span></p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <button onClick={onRestart} className={`w-full text-white py-4 px-8 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3 bg-${themeColor}-600 hover:bg-${themeColor}-700`}>
            <RotateCcw className="w-6 h-6" /> Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function Home() {
  const [stage, setStage] = useState('landing');
  const [studentName, setStudentName] = useState('');
  const [activeSubject, setActiveSubject] = useState('ecology');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const handleStart = (name, subject) => {
    setStudentName(name);
    setActiveSubject(subject);
    
    const activeDatabase = subject === 'ecology' ? ecologyQuestions : oopsQuestions;
    const questionCount = Math.min(50, activeDatabase.length);
    const selectedQuestions = selectRandomQuestions(activeDatabase, questionCount);
    const questionsWithShuffledOptions = selectedQuestions.map(shuffleOptions);
    
    setQuizQuestions(questionsWithShuffledOptions);
    setStage('quiz');
  };

  const handleQuizComplete = (userAnswers) => {
    setAnswers(userAnswers);
    setStage('result');
  };

  const handleRestart = () => {
    setStage('landing');
    setStudentName('');
    setQuizQuestions([]);
    setAnswers({});
  };

  return (
    <>
      {stage === 'landing' && <LandingPage onStart={handleStart} />}
      {stage === 'quiz' && (
        <QuizInterface
          studentName={studentName}
          subjectTheme={activeSubject}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      )}
      {stage === 'result' && (
        <ResultPage
          studentName={studentName}
          subjectTheme={activeSubject}
          questions={quizQuestions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}