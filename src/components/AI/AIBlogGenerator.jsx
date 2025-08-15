import React, { useState } from 'react';
import { LuSparkles, LuRotateCw, LuCopy, LuCheck } from 'react-icons/lu';
import Button from '../Inputs/Button';
import Input from '../Inputs/Input';

const AIBlogGenerator = ({ onGenerate, loading = false }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setGenerating(true);
    try {
      // Simulate AI generation with a more sophisticated mock
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockContent = generateMockContent(prompt);
      setGeneratedContent(mockContent);
      
      if (onGenerate) {
        onGenerate(mockContent);
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setGenerating(false);
    }
  };

  const generateMockContent = (userPrompt) => {
    const topics = {
      'react': {
        title: 'Advanced React Patterns and Best Practices',
        content: `# Advanced React Patterns and Best Practices

React has evolved significantly over the years, and with it, the patterns and practices that help us build maintainable, scalable applications. In this comprehensive guide, we'll explore some of the most powerful React patterns that every developer should know.

## 1. Custom Hooks Pattern

Custom hooks are one of the most powerful features in React. They allow you to extract component logic into reusable functions.

\`\`\`javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
\`\`\`

## 2. Compound Components Pattern

This pattern allows you to create components that work together to form a complete UI.

\`\`\`javascript
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children }) => (
  <div className="modal-header">{children}</div>
);

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);
\`\`\`

## 3. Render Props Pattern

Render props provide a way to share code between components using a prop whose value is a function.

## Conclusion

These patterns represent just a fraction of what's possible with React. The key is to understand when and why to use each pattern, always keeping in mind the principles of maintainability and reusability.

Remember: the best pattern is the one that solves your specific problem in the simplest way possible.`,
        excerpt: 'Explore advanced React patterns including custom hooks, compound components, and render props to build more maintainable applications.',
        tags: ['react', 'javascript', 'frontend', 'patterns', 'best-practices']
      },
      'javascript': {
        title: 'Modern JavaScript Features Every Developer Should Know',
        content: `# Modern JavaScript Features Every Developer Should Know

JavaScript continues to evolve rapidly, with new features being added regularly. Let's explore some of the most impactful modern JavaScript features that can improve your code quality and developer experience.

## 1. Optional Chaining (?.)

Optional chaining allows you to safely access nested object properties without worrying about null or undefined values.

\`\`\`javascript
// Before optional chaining
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}

// With optional chaining
console.log(user?.address?.street);
\`\`\`

## 2. Nullish Coalescing (??)

The nullish coalescing operator provides a way to handle null and undefined values more precisely than the logical OR operator.

\`\`\`javascript
// Using logical OR (can be problematic)
const value = someValue || 'default'; // Issues with 0, false, ''

// Using nullish coalescing
const value = someValue ?? 'default'; // Only null/undefined trigger default
\`\`\`

## 3. Destructuring Assignment

Destructuring allows you to extract values from arrays or properties from objects into distinct variables.

\`\`\`javascript
// Object destructuring
const { name, age, email } = user;

// Array destructuring
const [first, second, ...rest] = numbers;

// Nested destructuring
const { address: { street, city } } = user;
\`\`\`

## 4. Template Literals

Template literals provide an easy way to create multi-line strings and embed expressions.

\`\`\`javascript
const message = \`
  Hello \${name},
  Welcome to our platform!
  Today is \${new Date().toLocaleDateString()}
\`;
\`\`\`

## 5. Async/Await

Async/await makes asynchronous code more readable and easier to debug.

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
\`\`\`

## Conclusion

These modern JavaScript features can significantly improve your code's readability, maintainability, and robustness. Start incorporating them into your projects today!`,
        excerpt: 'Discover essential modern JavaScript features like optional chaining, nullish coalescing, and async/await that every developer should master.',
        tags: ['javascript', 'es6', 'modern-js', 'programming', 'web-development']
      },
      'web development': {
        title: 'The Complete Guide to Modern Web Development',
        content: `# The Complete Guide to Modern Web Development

Web development has transformed dramatically in recent years. This comprehensive guide covers the essential technologies, tools, and practices that define modern web development.

## Frontend Technologies

### React Ecosystem
React remains one of the most popular frontend frameworks, offering:
- Component-based architecture
- Virtual DOM for performance
- Rich ecosystem of libraries
- Strong community support

### State Management
Modern applications require sophisticated state management:
- **Redux Toolkit** for complex applications
- **Zustand** for simpler state needs
- **React Query** for server state
- **Context API** for component state

## Backend Technologies

### Node.js and Express
Node.js continues to dominate backend development:
- JavaScript everywhere
- NPM ecosystem
- Excellent performance for I/O operations
- Microservices architecture support

### Database Technologies
Choose the right database for your needs:
- **MongoDB** for document-based data
- **PostgreSQL** for relational data
- **Redis** for caching
- **Prisma** as an ORM solution

## Development Tools

### Build Tools
- **Vite** for lightning-fast development
- **Webpack** for complex configurations
- **Parcel** for zero-configuration builds

### Version Control
- **Git** with GitHub/GitLab
- **Conventional commits**
- **Branch strategies** (Git Flow, GitHub Flow)

## Best Practices

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Unit testing with Jest

### Performance
- Code splitting
- Lazy loading
- Image optimization
- CDN usage

### Security
- HTTPS everywhere
- Input validation
- Authentication best practices
- Regular dependency updates

## Deployment and DevOps

### Cloud Platforms
- **Vercel** for frontend applications
- **Netlify** for static sites
- **AWS/Azure/GCP** for full-stack applications
- **Docker** for containerization

### CI/CD
- GitHub Actions
- Automated testing
- Automated deployments
- Environment management

## Conclusion

Modern web development is an exciting field with constantly evolving technologies. Focus on learning the fundamentals well, then gradually adopt new tools and practices as they prove their value.

The key is to build projects, experiment with new technologies, and never stop learning!`,
        excerpt: 'A comprehensive overview of modern web development technologies, tools, and best practices for building scalable applications.',
        tags: ['web-development', 'frontend', 'backend', 'javascript', 'react', 'nodejs']
      }
    };

    // Find the best matching topic
    const lowerPrompt = userPrompt.toLowerCase();
    let selectedTopic = null;

    for (const [key, topic] of Object.entries(topics)) {
      if (lowerPrompt.includes(key)) {
        selectedTopic = topic;
        break;
      }
    }

    // If no specific topic found, generate a generic response
    if (!selectedTopic) {
      selectedTopic = {
        title: `Understanding ${userPrompt}`,
        content: `# Understanding ${userPrompt}

This is an AI-generated blog post about ${userPrompt}. 

## Introduction

${userPrompt} is an important topic in today's digital landscape. Let's explore the key concepts and practical applications.

## Key Concepts

Understanding the fundamentals is crucial for mastering ${userPrompt}. Here are the main points to consider:

1. **Foundation**: Start with the basics and build your knowledge systematically
2. **Practice**: Apply what you learn through hands-on projects
3. **Community**: Engage with others who share your interests
4. **Continuous Learning**: Stay updated with the latest developments

## Practical Applications

${userPrompt} has numerous real-world applications:

- Problem-solving in various domains
- Improving efficiency and productivity
- Creating innovative solutions
- Building better user experiences

## Best Practices

When working with ${userPrompt}, consider these best practices:

\`\`\`javascript
// Example code snippet
function example() {
  console.log('This is a sample implementation');
  return 'Success';
}
\`\`\`

## Conclusion

${userPrompt} is a valuable skill that can enhance your professional development. Continue learning and practicing to master this important topic.

Remember: consistency and persistence are key to success in any learning journey.`,
        excerpt: `An AI-generated comprehensive guide to ${userPrompt}, covering key concepts, practical applications, and best practices.`,
        tags: [userPrompt.toLowerCase().replace(/\s+/g, '-'), 'ai-generated', 'guide', 'tutorial']
      };
    }

    return {
      title: selectedTopic.title,
      content: selectedTopic.content,
      excerpt: selectedTopic.excerpt,
      tags: selectedTopic.tags,
      readingTime: Math.ceil(selectedTopic.content.split(' ').length / 200)
    };
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  };

  const handleUseContent = () => {
    if (onGenerate && generatedContent) {
      onGenerate(generatedContent);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <LuSparkles className="h-6 w-6 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">AI Blog Generator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Input
            label="What would you like to write about?"
            placeholder="e.g., React best practices, JavaScript tips, web development trends..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={generating}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || generating}
          variant="primary"
          className="w-full"
        >
          {generating ? (
            <>
              <LuRotateCw className="h-4 w-4 mr-2 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <LuSparkles className="h-4 w-4 mr-2" />
              Generate Blog Post
            </>
          )}
        </Button>

        {generatedContent && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">Generated Content</h4>
              <div className="flex space-x-2">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                >
                  {copied ? (
                    <>
                      <LuCheck className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <LuCopy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleUseContent}
                  variant="primary"
                  size="sm"
                >
                  Use This Content
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title:</label>
                  <p className="text-gray-900 font-medium">{generatedContent.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Excerpt:</label>
                  <p className="text-gray-600 text-sm">{generatedContent.excerpt}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Tags:</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generatedContent.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Reading Time:</label>
                  <p className="text-gray-600 text-sm">{generatedContent.readingTime} minutes</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Content Preview:</label>
                  <div className="text-sm text-gray-600 bg-white p-3 rounded border max-h-40 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-xs">
                      {generatedContent.content.substring(0, 500)}...
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBlogGenerator;