import { SectionCard } from "@/components/section-card";
import {
  dashboardKpis,
  quickActions,
  receipts,
  recentActivities,
  salesOrders,
} from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="dashboard-page">
      <section className="page-header">
        <span className="brand-tag">Analytics Dashboard</span>
        <p>Monitor warehouse activity, stock movement, and order execution.</p>
      </section>

      <section className="analytics-overview-grid">
        <article className="analytics-hero-card">
          <div>
            <span className="analytics-badge">Warehouse Snapshot</span>
            <h2>Operations are stable across inbound, storage, and dispatch.</h2>
            <p>
              APM-WMS gives warehouse teams a single control room for receipts,
              inventory, locations, and sales fulfillment.
            </p>
          </div>
          <div className="analytics-hero-stats">
            <div>
              <span>Dispatch target</span>
              <strong>82%</strong>
            </div>
            <div>
              <span>Open shifts</span>
              <strong>04</strong>
            </div>
          </div>
        </article>

        <article className="analytics-side-card">
          <span className="card-kicker">Today</span>
          <strong>156 picks completed</strong>
          <p>Performance is ahead of yesterday with no major exceptions raised.</p>
        </article>
      </section>

      <section className="dashboard-kpi-grid">
        {dashboardKpis.map((kpi) => (
          <article className="dashboard-kpi-card" key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <p>{kpi.note}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-main-grid">
        <SectionCard title="Quick Actions" description="">
          <div className="quick-action-grid">
            {quickActions.map((action) => (
              <article key={action.title} className={`quick-action-card ${action.tone}`}>
                <strong>{action.title}</strong>
                <span>Open module</span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Activity" description="">
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <article className="activity-row" key={activity.title}>
                <div className="activity-bullet" />
                <div>
                  <strong>{activity.title}</strong>
                  <p>{activity.detail}</p>
                </div>
                <span>{activity.time}</span>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="dashboard-main-grid">
        <SectionCard title="Inbound Queue" description="">
          <div className="stack-list">
            {receipts.map((receipt) => (
              <article className="stack-row" key={receipt.receiptNo}>
                <div>
                  <strong>{receipt.receiptNo}</strong>
                  <p>
                    {receipt.supplier} | {receipt.itemCode}
                  </p>
                </div>
                <div className="stack-meta">
                  <span>{receipt.quantity} units</span>
                  <span className="pill neutral">{receipt.status}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Outbound Queue" description="">
          <div className="stack-list">
            {salesOrders.map((order) => (
              <article className="stack-row" key={order.orderNo}>
                <div>
                  <strong>{order.orderNo}</strong>
                  <p>{order.customer}</p>
                </div>
                <div className="stack-meta">
                  <span>{order.items} items</span>
                  <span className="pill success">{order.status}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </main>
  );
}
