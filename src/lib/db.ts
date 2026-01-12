
// Local In-Memory DB for testing
// In production, this would be replaced by Supabase client

export interface AnalysisResult {
  id: string;
  createdAt: string;
  status: 'pending' | 'paid' | 'completed';
  content?: string; // The raw text input
  score?: number;
  verdict?: string;
  summary?: string;
  personas?: any[];
}

class MockDB {
  private analyses: AnalysisResult[] = [];
  
  async createAnalysis(data: AnalysisResult) {
    this.analyses.push(data);
    return data;
  }
  
  async getAnalysis(id: string) {
    return this.analyses.find(a => a.id === id);
  }
  
  async getRecent() {
    return this.analyses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);
  }

  async updateAnalysis(id: string, updates: Partial<AnalysisResult>) {
    const index = this.analyses.findIndex(a => a.id === id);
    if (index !== -1) {
        this.analyses[index] = { ...this.analyses[index], ...updates };
        return this.analyses[index];
    }
    return null;
  }
}

// Singleton instance
export const db = new MockDB();
